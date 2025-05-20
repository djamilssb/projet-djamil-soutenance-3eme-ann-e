// app/score-page/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import './style.css';

export default function ScorePage() {
  const searchParams = useSearchParams();
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
        
        <h2 className="score-title">{message}</h2>
        
        <div className={`score-value ${colorClass} ${animateScore ? 'animate' : ''}`}>
          <span className="score-number">{score}</span>
          <span className="score-divider">/</span>
          <span className="score-total">{total}</span>
        </div>
        
        <div className="score-percentage">
          {percentage}% de bonnes réponses
        </div>
        
        <div className="buttons-container">
          <Link href="/game" className="home-button">
            Retour aux jeux
          </Link>
          
          <Link href={`/game/quiz?quizId=${quizId}`} className="replay-button">
            Rejouer ce quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
