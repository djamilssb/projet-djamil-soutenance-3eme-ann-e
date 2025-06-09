"use client";

import { useState, useEffect } from "react";
import QuizListItem from './QuizListItem';
import Link from "next/link";
import Quizz from "@/app/api/models/Quizz";

interface QuizListProps {
  idUserNull?: boolean; // Nouveau prop pour filtrer id_user=NULL 
  userId?: number; 
  showCreateButton?: boolean;
  mode?: 'play' | 'edit'; // Nouveau prop pour le mode d'affichage
}

interface Quiz {
  id: number;
  title: string;
  date: string; 
  userName: string; 
}

export default function QuizList({ 
  idUserNull = false, 
  userId, 
  showCreateButton = true,
  mode = 'edit' // Par défaut, mode édition 
}: QuizListProps): React.JSX.Element {
    const [quizList, setQuizList] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchQuizzes() {
            try {
                setLoading(true);
                
                let url = '/api/quizz';
                const params = new URLSearchParams();
                
                // Utiliser idUserNull au lieu de isCustom
                if (idUserNull) {
                    params.append('idUserNull', '1');
                }
                
                if (userId) {
                    params.append('userId', userId.toString());
                }
                
                if (params.toString()) {
                    url += `?${params.toString()}`;
                }
                
                const response = await fetch(url);
                
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des quiz');
                }
                
                const data = await response.json();
                
                // Ajouter du code de débogage
                console.log("Données brutes de l'API:", data);
                
                const formattedData = data.map((quiz: Quizz) => ({
                    id: quiz.id,
                    title: quiz.title,
                    date: new Date(quiz.created_at).toLocaleDateString('fr-FR'),
                    userName: quiz.userName || 'Anonyme'
                }));
                
                console.log("Données formatées:", formattedData);
                
                setQuizList(formattedData);
            } catch (err) {
                console.error('Erreur de chargement des quiz:', err);
                setError('Impossible de charger les quiz. Veuillez réessayer plus tard.');
                setQuizList([{'id': 1, 'title': 'London2012', 'date': '22/01/2025', 'userName': 'Jerome82'}]);
            } finally {
                setLoading(false);
            }
        }

        fetchQuizzes();
    }, [idUserNull, userId]); // Modifier la dépendance

    return (
        <div className="quiz-list">
            <div className="list-inner">
                <div className="list-top">
                    <div className="list-header">
                        <div className="item">Nom du quizz</div>
                        <div className="item">Date de création</div>
                        <div className="item">Nom du créateur</div>
                        <div className="item"></div>
                    </div>
                    {loading ? (
                        <div className="loading">Chargement des quiz...</div>
                    ) : error ? (
                        <div className="error">{error}</div>
                    ) : (
                        <div className="list-body">
                            {quizList.length === 0 ? (
                                <div className="no-quizzes">Aucun quiz disponible</div>
                            ) : (
                                quizList.map((quiz, index) =>
                                    <QuizListItem 
                                        key={index} 
                                        id={quiz.id} 
                                        title={quiz.title} 
                                        date={quiz.date} 
                                        userName={quiz.userName}
                                        mode={mode} // Passer le mode à QuizListItem
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
            {showCreateButton && (
                <div className="list-footer">
                    <Link href="/account/quizzes/create" className="btn big-btn">Créer un nouveau quizz</Link>
                </div>
            )}
        </div>
    );
}