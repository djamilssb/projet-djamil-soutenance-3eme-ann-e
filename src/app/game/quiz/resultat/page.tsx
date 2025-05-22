// app/score-page/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import './style.css';

export default function ScorePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // À AJOUTER DANS LE FUTUR: Vérification de l'authentification
  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const isAuthenticated = await verifyUserAuthentication();
  //     if (!isAuthenticated) {
  //       router.push('/login?returnUrl=/game/quiz-list');
  //     }
  //   };
  //   
  //   checkAuth();
  // }, [router]);
  
  const [animateScore, setAnimateScore] = useState(false);
  
  // Récupération des paramètres de l'URL
  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '10');
  const quizId = parseInt(searchParams.get('quizId') || '1');
  
  // Animation du score après le chargement de la page
  useEffect(() => {
    setTimeout(() => {
      setAnimateScore(true);
    }, 300);
  }, []);
  
  // Sauvegarde du score lors du chargement de la page
  useEffect(() => {
    // Uniquement si nous avons un score valide
    if (score > 0 && quizId > 0) {
      saveScore();
    }
  }, [score, quizId]); // S'exécute uniquement si score ou quizId change

  const saveScore = async () => {
    try {
      // À MODIFIER: Remplacer par l'ID de personnage réel quand disponible
      const characterId = 1;
      
      // À MODIFIER: Remplacer par l'ID de l'utilisateur connecté quand l'authentification sera en place
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
        console.error("Erreur lors de la sauvegarde du score:", response.status);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du score:", error);
    }
  };
  
  // Fonction pour rejouer le quiz
  const handleReplayQuiz = () => {
    // À MODIFIER: Vous pourriez vouloir effectuer des actions supplémentaires ici
    // comme effacer des états globaux, réinitialiser des compteurs, etc.
    
    // À AJOUTER DANS LE FUTUR: Vérification de l'authentification avant de rejouer
    // if (!isAuthenticated) {
    //   router.push('/login?returnUrl=/game/quiz/questions?quizId=' + quizId);
    //   return;
    // }
    
    // Redirection vers le même quiz pour le rejouer
    router.push(`/game/quiz/questions?quizId=${quizId}`);
  };
  
  // Calculer le pourcentage de réussite
  const percentage = Math.round((score / total) * 100);
  
  // Déterminer le message et la couleur en fonction du score
  let message, colorClass;
  if (percentage >= 80) {
    message = "Excellent ! Tu es un expert !";
    colorClass = "excellent";
  } else if (percentage >= 60) {
    message = "Bien joué ! Tu t'en sors très bien !";
    colorClass = "good";
  } else if (percentage >= 40) {
    message = "Pas mal ! Continue à explorer !";
    colorClass = "average";
  } else {
    message = "Continue d'apprendre ! Tu vas progresser !";
    colorClass = "needs-improvement";
  }
  
  return (
    <div className="score-page">
      <div className="score-content">
        <div className="avatar-container">
          <Image 
            src="/alien1.png"
            alt="Avatar personnage"
            width={150}
            height={150}
            className="avatar-image"
          />
        </div>
        
        <h1 className="score-title">{message}</h1>
        
        <div className={`score-value ${animateScore ? 'animate' : ''} ${colorClass}`}>
          <span className="score-number">{score}</span>
          <span className="score-divider">/</span>
          <span className="total-number">{total}</span>
        </div>
        
        <div className="score-percentage">
          {percentage}% de réussite
        </div>
        
        <div className="buttons-container">
          <Link href="/game/quiz-list">
            <button className="home-button">
              Retour aux jeux
            </button>
          </Link>
          
          {/* Bouton pour rejouer avec gestionnaire d'événements */}
          <button 
            className="replay-button"
            onClick={handleReplayQuiz}
          >
            Rejouer le quiz
          </button>
        </div>
      </div>
    </div>
  );
}
