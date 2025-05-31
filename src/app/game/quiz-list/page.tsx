"use client";

import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import QuizList from '@/app/components/quizzes/QuizList';
import './style.css';

// Composant interne pour gérer les searchParams
function QuizListContent() {
  const searchParams = useSearchParams();
  const quizType = searchParams?.get('type') || 'generic';
  
  // État pour gérer l'ID utilisateur et le chargement
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer l'ID utilisateur via l'API
  const fetchUserId = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const tokenResponse = await fetch('/api/auth/token-id');
      
      if (!tokenResponse.ok) {
        throw new Error('Utilisateur non connecté');
      }
      
      const data = await tokenResponse.json();
      setUserId(data.userId || data.id);
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'ID utilisateur:', err);
      setError('Impossible de récupérer les informations utilisateur');
      setUserId(undefined);
    } finally {
      setIsLoading(false);
    }
  };

  // Récupérer l'ID utilisateur au chargement du composant
  useEffect(() => {
    fetchUserId();
  }, []);

  // Configuration selon le type de quiz
  const isGeneric = quizType === 'generic';
  const isPersonal = quizType === 'personal';

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <div className="quizz-container">
        <h1>Chargement...</h1>
        <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
          <p>Récupération des informations utilisateur...</p>
        </div>
      </div>
    );
  }

  // Si quiz personnalisé mais utilisateur non connecté ou erreur
  if (isPersonal && (!userId || error)) {
    return (
      <div className="quizz-container">
        <h1>Mes Quiz Personnalisés</h1>
        <div style={{ color: 'white', textAlign: 'center', padding: '20px' }}>
          <p>Vous devez être connecté pour voir vos quiz personnalisés.</p>
          <p>Veuillez vous connecter pour accéder à cette fonctionnalité.</p>
          {error && <p style={{ color: '#ff6b6b' }}>Erreur: {error}</p>}
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
