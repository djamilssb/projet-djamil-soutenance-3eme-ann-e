"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { mockQuestions, mockAnswers, MockAnswer } from "../../../__tests__/quizMockData";
import "./style.css";

// Composant principal du Quiz
export default function QuizClient({ quizId }: { quizId: number }) {
  const queryClient = new QueryClient();

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
  const [selectedAnswer, setSelectedAnswer] = useState<MockAnswer | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
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

  // Utilisation des données fictives importées
  const questions = mockQuestions.filter(q => q.idQuizz === quizId);
  const answers = mockAnswers[currentQuestionIndex] || [];

  // Gérer la sélection d'une réponse
  const handleAnswerSelect = (answer: MockAnswer) => {
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
      // Rediriger vers la page des scores sans sauvegarder (pas de BDD)
      alert(`Quiz terminé! Votre score: ${score}/10`);
      router.push(`/game/quiz/score?quizId=${quizId}&score=${score}`);
    }
  };

  // Vérification que questions existe et a des éléments
  if (!questions || questions.length === 0) {
    return <div className="quizz-page">Aucune question disponible pour ce quiz</div>;
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
            {answers && answers.map((answer: MockAnswer, index: number) => (
              <button
                key={answer.id}
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
        </div>
      </div>
    </div>
  );
}