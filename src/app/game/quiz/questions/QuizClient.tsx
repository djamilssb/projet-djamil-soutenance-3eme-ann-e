"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mockQuestions, mockAnswers, MockAnswer } from "../../../__tests__/quizMockData";
import "./style.css";

// Composant principal du Quiz
export default function QuizClient({ quizId }: { quizId: number }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1, // Limite les tentatives de requête en cas d'échec
        staleTime: 5 * 60 * 1000, // Cache les données pendant 5 minutes
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <QuizContent quizId={quizId} />
    </QueryClientProvider>
  );
}

// Sous-composant qui contient la logique du quiz
function QuizContent({ quizId }: { quizId: number }) {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [useFallbackData, setUseFallbackData] = useState(false);
  
  // Cache le footer et autres éléments du layout
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    const layoutBg = document.querySelector('.absolute.top-0.left-0.w-full.h-full.-z-10');
    if (layoutBg) {
      (layoutBg as HTMLElement).style.display = 'none';
    }

    return () => {
      if (footer) {
        footer.style.display = '';
      }
      if (layoutBg) {
        (layoutBg as HTMLElement).style.display = '';
      }
    };
  }, []);

  // Récupérer les questions du quiz depuis l'API
  const { 
    data: questions, 
    isLoading: questionsLoading, 
    isError: questionsError,
    error: questionsErrorDetails
  } = useQuery({
    queryKey: ["questions", quizId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/questions?quizzId=${quizId}`);
        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }
        const data = await response.json();
        return data.sort((a: any, b: any) => a.orderIndex - b.orderIndex);
      } catch (error) {
        console.error("Erreur lors du chargement des questions:", error);
        // Si on ne peut pas récupérer les données, on utilise les données de test
        if (process.env.NODE_ENV === 'development') {
          console.log("Utilisation des données mock en développement");
          setUseFallbackData(true);
          return mockQuestions.filter(q => q.idQuizz === quizId);
        }
        throw error;
      }
    },
  });

  // Récupérer les réponses pour la question actuelle
  const {
    data: answers,
    isLoading: answersLoading,
    isError: answersError
  } = useQuery({
    queryKey: ["answers", questions?.[currentQuestionIndex]?.id, currentQuestionIndex],
    queryFn: async () => {
      try {
        if (useFallbackData) {
          return mockAnswers[currentQuestionIndex] || [];
        }
        
        if (!questions?.[currentQuestionIndex]?.id) return [];
        
        const response = await fetch(`/api/answers?questionId=${questions[currentQuestionIndex].id}`);
        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Erreur lors du chargement des réponses:", error);
        // Fallback vers les données de test en développement
        if (process.env.NODE_ENV === 'development') {
          return mockAnswers[currentQuestionIndex] || [];
        }
        throw error;
      }
    },
    enabled: !!questions?.[currentQuestionIndex]?.id || useFallbackData,
  });

  // Gérer la sélection d'une réponse
  const handleAnswerSelect = (answer: any) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer.isCorrect) {
      setScore(score + 1);
    }
  };

  // Passer à la question suivante
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    if (currentQuestionIndex < 9) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Sauvegarder le score
      saveScore();
      router.push(`/game/quiz/score?quizId=${quizId}&score=${score}`);
    }
  };

  // Sauvegarder le score dans la BDD
  const saveScore = async () => {
    if (useFallbackData) {
      console.log("Mode test: Score non sauvegardé", { quizId, score });
      return;
    }

    try {
      const response = await fetch("/api/savequizz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_quizz: quizId,
          id_user: 1, // À remplacer par l'ID de l'utilisateur actuel
          score: score,
        }),
      });
      
      if (!response.ok) {
        console.error("Erreur lors de la sauvegarde du score:", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du score:", error);
    }
  };

  // Retourner au menu principal
  const handleReturnToMenu = () => {
    router.push('/game');
  };

  // Afficher un message d'erreur
  if (questionsError && !useFallbackData) {
    return (
      <div className="quiz-fullscreen">
        <div className="quiz-background">
          <Image
            src="/paris.png"
            alt="Background de la question"
            fill
            style={{ objectFit: 'cover', opacity: 0.5 }}
            priority
          />
        </div>
        <div className="error-container">
          <h2>Ce quiz n'est pas disponible pour le moment</h2>
          <p>Nous rencontrons des difficultés techniques. Merci de réessayer plus tard.</p>
          <button onClick={handleReturnToMenu} className="return-button">
            Retourner au menu
          </button>
        </div>
      </div>
    );
  }

  // Afficher un chargement pendant la récupération des données
  if ((questionsLoading || answersLoading) && !useFallbackData) {
    return (
      <div className="quiz-fullscreen">
        <div className="quiz-background">
          <Image
            src="/paris.png"
            alt="Background de la question"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="loading-container">
          <p>Chargement du quiz...</p>
        </div>
      </div>
    );
  }

  // Vérifier que questions existe et a des éléments
  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-fullscreen">
        <div className="quiz-background">
          <Image
            src="/paris.png"
            alt="Background de la question"
            fill
            style={{ objectFit: 'cover', opacity: 0.5 }}
            priority
          />
        </div>
        <div className="error-container">
          <h2>Quiz non trouvé</h2>
          <p>Le quiz que vous recherchez n'existe pas ou a été supprimé.</p>
          <button onClick={handleReturnToMenu} className="return-button">
            Retourner au menu
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-fullscreen">
      {/* Image de fond */}
      <div className="quiz-background">
        <Image
          src="/paris.png"
          alt="Background de la question"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      {/* Contenu du quiz */}
      <div className="quizz-content">
        {/* Personnage */}
        <img 
          src="/alien1.png" 
          alt="Personnage Alien" 
          className="character"
        />

        {/* Boîte de question */}
        <div className="question-container">
          {/* Indicateur de progression */}
          <p className="question-progress">
            Question {currentQuestionIndex + 1}/10
          </p>
          
          <p className="question-text">
            <strong>Question :</strong> {currentQuestion.content}
          </p>
          
          <div className="answer-grid">
            {answers && answers.map((answer: any, index: number) => (
              <button
                key={answer.id || index}
                onClick={() => handleAnswerSelect(answer)}
                className={`answer-button ${
                  selectedAnswer?.id === answer.id
                    ? answer.isCorrect ? "correct" : "incorrect"
                    : ""
                }`}
                disabled={showFeedback}
              >
                {String.fromCharCode(97 + index)}. {answer.content}
              </button>
            ))}
          </div>
          
          {/* Feedback et bouton suivant */}
          {showFeedback && (
            <div className="feedback-container">
              <p className={`feedback-text ${selectedAnswer?.isCorrect ? "correct" : "incorrect"}`}>
                {selectedAnswer?.isCorrect ? "Bonne réponse!" : "Mauvaise réponse!"}
                {selectedAnswer?.explication && (
                  <span className="feedback-explanation">
                    {selectedAnswer.explication}
                  </span>
                )}
              </p>
              <button
                onClick={handleNextQuestion}
                className="next-button"
              >
                {currentQuestionIndex < 9 ? "Question suivante" : "Voir mon score"}
              </button>
            </div>
          )}
          
          {/* Message en mode développement */}
          {useFallbackData && (
            <div className="dev-message">
              Mode développement: Utilisation des données de test
            </div>
          )}
        </div>
      </div>
    </div>
  );
}