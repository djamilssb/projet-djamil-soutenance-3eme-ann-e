"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mockQuestions, mockAnswers, mockQuizzes, MockAnswer } from "../../../__tests__/quizMockData";
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

  // Récupérer les informations du quiz
  const { 
    data: quizInfo, 
    isLoading: quizLoading, 
    isError: quizError 
  } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/quizz?id=${quizId}`);
        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Erreur lors du chargement des informations du quiz:", error);
        // Utiliser les données mock en développement
        if (process.env.NODE_ENV === 'development') {
          console.log("Utilisation des données quiz mock en développement");
          setUseFallbackData(true);
          const mockQuiz = mockQuizzes.find(q => q.id === quizId);
          return mockQuiz || mockQuizzes[0]; // Retourner le premier quiz par défaut si l'ID n'est pas trouvé
        }
        throw error;
      }
    },
  });

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
        const response = await fetch(`/api/questions?quizId=${quizId}`);
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

  // Déterminer le nombre total de questions
  const totalQuestions = quizInfo?.questionCount || questions?.length || 10;

  // Passer à la question suivante
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Sauvegarder le score
      saveScore();
      router.push(`/game/quiz/resultat?quizId=${quizId}&score=${score}&total=${totalQuestions}`);
    }
  };

  // Sauvegarder le score dans la BDD
  const saveScore = async () => {
    if (useFallbackData) {
      console.log("Mode test: Score non sauvegardé", { quizId, score });
      return;
    }

    try {
      // Récupération d'un ID de personnage (avatar) par défaut
      // À MODIFIER: Récupérer l'ID réel du personnage quand disponible
      const characterId = 1; // Valeur par défaut pour le moment
      
      // À MODIFIER: Remplacer par l'ID de l'utilisateur connecté quand l'authentification sera en place
      const userId = 1; // Utilisateur par défaut pour le développement
      
      const response = await fetch("/api/savequizz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_quizz: quizId,
          id_user: userId,
          id_character: characterId,
          score: score,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      console.log("Score sauvegardé avec succès!");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du score:", error);
      // Option: Vous pourriez afficher un message à l'utilisateur ici
    }
  };

  // Retourner au menu principal
  const handleReturnToMenu = () => {
    router.push('/game');
  };

  // Afficher un message d'erreur
  if ((questionsError || quizError) && !useFallbackData) {
    return (
      <div className="quiz-fullscreen">
        <div className="quiz-background">
          <Image
            src="/paris.png" // Image par défaut
            alt="Background du quiz"
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
  if ((questionsLoading || answersLoading || quizLoading) && !useFallbackData) {
    return (
      <div className="quiz-fullscreen">
        <div className="quiz-background">
          <Image
            src="/paris.png" // Image par défaut
            alt="Background du quiz"
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
  if (!questions || questions.length === 0 || !quizInfo) {
    return (
      <div className="quiz-fullscreen">
        <div className="quiz-background">
          <Image
            src="/paris.png" // Image par défaut
            alt="Background du quiz"
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
  
  // Images dynamiques du quiz
  const backgroundImage = quizInfo.backgroundImage || "/paris.png";
  const avatarImage = quizInfo.avatarImage || "/alien1.png";

  return (
    <div className="quiz-fullscreen">
      {/* Image de fond dynamique */}
      <div className="quiz-background">
        <Image
          src={backgroundImage}
          alt="Background du quiz"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      {/* Contenu du quiz */}
      <div className="quizz-content">
        {/* Personnage dynamique */}
        <img 
          src={avatarImage}
          alt="Avatar du quiz"
          className="character"
        />

        {/* Boîte de question */}
        <div className="question-container">
          {/* Indicateur de progression */}
          <p className="question-progress">
            Question {currentQuestionIndex + 1}/{totalQuestions}
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
                {currentQuestionIndex < totalQuestions - 1 ? "Question suivante" : "Voir mon score"}
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