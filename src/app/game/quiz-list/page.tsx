"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import QuizList from '@/app/components/quizzes/QuizList';
import './style.css';

// Composant interne pour gérer les searchParams
function QuizListContent() {
  const searchParams = useSearchParams();
  const quizType = searchParams?.get('type') || 'generic';

  // Récupérer l'ID utilisateur depuis localStorage (seulement côté client)
  const getUserId = (): number | undefined => {
    if (typeof window !== 'undefined') {
      const userIdStr = localStorage.getItem('userId');
      return userIdStr ? parseInt(userIdStr) : undefined;
    }
    return undefined;
  };

  const userId = getUserId();

  // Configuration selon le type de quiz
  const isGeneric = quizType === 'generic';
  const isPersonal = quizType === 'personal';

  // Si quiz personnalisé mais utilisateur non connecté
  if (isPersonal && !userId) {
    return (
      <div className="quizz-container">
        <h1>Mes Quiz Personnalisés</h1>
        <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
          <p>Vous devez être connecté pour voir vos quiz personnalisés.</p>
          <p>Veuillez vous connecter pour accéder à cette fonctionnalité.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quizz-container">
      <h1>
        {isGeneric ? 'Quiz Génériques' : 'Mes Quiz Personnalisés'}
      </h1>
      <QuizList 
        idUserNull={isGeneric}           
        userId={isPersonal ? userId : undefined}  
        showCreateButton={false}        
        mode="play"                     
      />
    </div>
  );
}

// Composant principal avec Suspense
export default function QuizzListPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <QuizListContent />
    </Suspense>
  );
}
