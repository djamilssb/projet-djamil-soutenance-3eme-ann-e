"use client"; //s'execute côté client
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import QueryClientProvider from '@/app/components/QueryClientProvider';
import Image from 'next/image';
import './style.css';
import { mockQuizzes, mockQuestions, mockAnswers } from '@/app/__tests__/quizMockData';

// ===== FONCTIONS UTILITAIRES =====
// Fonction avatar selon l'ID
const getAvatarImage = (id: number): string => {
  switch(id) {
    case 1: return "/alien1.png";
    case 2: return "/AlienVert 1.png";
    default: return "/alien1.png";
  }
};

// ===== COMPOSANT PRINCIPAL =====
function QuizGameContent({ quizId, avatarId }: { quizId: number, avatarId: number }) {
  // ===== ÉTATS DU COMPOSANT =====
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [useFallbackData, setUseFallbackData] = useState(false);

  // ===== EFFET POUR MASQUER LE LAYOUT =====
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

  // ===== REQUÊTES API AVEC REACT QUERY =====
  // Récupérer info quiz
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
        if (process.env.NODE_ENV === 'development') {
          console.log("Utilisation des données quiz mock en développement");
          setUseFallbackData(true);
          const mockQuiz = mockQuizzes.find(q => q.id === quizId);
          return mockQuiz || mockQuizzes[0];
        }
        throw error;
      }
    },
  });

  // Récupérer questions depuis l'API
  const { 
    data: questions, 
    isLoading: questionsLoading, 
    isError: questionsError
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
        // mock si bdd offkine ou erreur
        if (process.env.NODE_ENV === 'development') {
          console.log("Utilisation des données mock en développement");
          setUseFallbackData(true);
          return mockQuestions.filter(q => q.idQuizz === quizId);
        }
        throw error;
      }
    },
  });

  // Récupérer réponse question actuelle
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
        // Fallback vers mock
        if (process.env.NODE_ENV === 'development') {
          return mockAnswers[currentQuestionIndex] || [];
        }
        throw error;
      }
    },
    enabled: !!questions?.[currentQuestionIndex]?.id || useFallbackData,
  });

  // ===== FONCTIONS DE GESTION DU QUIZ =====
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
      router.push(`/game/quiz/resultat?quizId=${quizId}&score=${score}&total=${totalQuestions}&avatarId=${avatarId}`);
    }
  };

  // Sauvegarder le score dans la BDD
  const saveScore = async () => {
    if (useFallbackData) {
      console.log("Mode test: Score non sauvegardé", { quizId, score });
      return;
    }

    try {
      const characterId = 1;
      const userId = 1;
      
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
    }
  };

  // Retourner au menu principal
  const handleReturnToMenu = () => {
    router.push('/game');
  };

  // ===== GESTION DES ERREURS ET CHARGEMENT =====
  if ((questionsError || quizError) && !useFallbackData) {
    return (
      <div className="quiz-fullscreen">
        <div className="quiz-background">
          <Image
            src="/paris.png"
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
            src="/paris.png"
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

  // Vérif questions
  if (!questions || questions.length === 0 || !quizInfo) {
    return (
      <div className="quiz-fullscreen">
        <div className="quiz-background">
          <Image
            src="/paris.png"
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

  // ===== VARIABLES POUR L'AFFICHAGE =====
  const currentQuestion = questions[currentQuestionIndex];
  const backgroundImage = quizInfo.backgroundImage || "/paris.png";
  const avatarImage = getAvatarImage(avatarId);

  // ===== RENDU JSX =====
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

// ===== COMPOSANT DE PAGE PRINCIPAL =====
export default function QuizzPage() {
  // Utilisation de useSearchParams pour récupérer les paramètres d'URL
  const searchParams = useSearchParams();
  
  // Récupération des paramètres d'URL
  const quizIdParam = searchParams?.get('quizId') || "1";
  const quizId = parseInt(quizIdParam);
  
  const avatarIdParam = searchParams?.get('avatarId') || "1";
  const avatarId = parseInt(avatarIdParam);

  // Rendu avec QueryClientProvider (gestion des requêtes)
  return (
    <QueryClientProvider>
      <QuizGameContent quizId={quizId} avatarId={avatarId} />
    </QueryClientProvider>
  );
}