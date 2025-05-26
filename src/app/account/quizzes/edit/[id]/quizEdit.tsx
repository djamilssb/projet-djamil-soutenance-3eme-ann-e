'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import QuizForm from "@/app/components/quizzes/QuizForm";
import { useQuery } from '@tanstack/react-query';
import Loader from '@/app/components/Loader';
import { ParamValue } from 'next/dist/server/request/params';
import Question from '@/app/api/models/Question';
import Answer from '@/app/api/models/Answer';

const formatDate = (isoString: string): string => {
    const d = new Date(isoString);
    return d.toLocaleDateString('fr-FR');
};
  
const fetchQuizById = async (id: ParamValue | undefined) => {
    const res = await fetch(`/api/quizz/${id}`);
    if (!res.ok) throw new Error('Failed to fetch quiz');
    return res.json();
};
  
const fetchQuestionsByQuiz = async (id: ParamValue | undefined) => {
    const res = await fetch(`/api/quizz/${id}/questions/`);
    if (!res.ok) throw new Error('Failed to fetch questions');
    return res.json();
};

const fetchAnswersByQuestion = async (id: number | undefined) => {
    const res = await fetch(`/api/questions/${id}/answers/`);
    if (!res.ok) throw new Error('Failed to fetch answers');
    return res.json();
};

export default function QuizEdit(): React.JSX.Element {
    // const data = {
    //     "quiz_name": "first quiz",
    //     "quiz_author": "beaverok",
    //     "quiz_date": "17/05/2025",
    //     "questions": [
    //         { 
    //             "text": "q1",
    //             "answers": [
    //                 {
    //                     "text": "a1",
    //                     "correct": true
    //                 },
    //                 {
    //                     "text": "a2",
    //                     "correct": false
    //                 },
    //                 {
    //                     "text": "a3",
    //                     "correct": false
    //                 },
    //                 {
    //                     "text": "a4",
    //                     "correct": false
    //                 }
    //             ]
    //         },
    //         {
    //             "text": "q2",
    //             "answers": [
    //                 {
    //                     "text": "r1",
    //                     "correct": false
    //                 },
    //                 {
    //                     "text": "r2",
    //                     "correct": true
    //                 },
    //                 {
    //                     "text": "r3",
    //                     "correct": false
    //                 },
    //                 {
    //                     "text": "r4",
    //                     "correct": false
    //                 }
    //             ]
    //         }
    //     ]
    // }

    const { id } = useParams();
    // const [data, setData] = useState<any>(null);
    // const [isLoading, setIsLoading] = useState(true);

    const { data: quizData, isLoading: loadingQuiz } = useQuery({
        queryKey: ['quiz', id],
        queryFn: () => fetchQuizById(id),
        enabled: !!id,
    });

    const { data: questions, isLoading: loadingQuestions } = useQuery({
        queryKey: ['questions', id],
        queryFn: async () => {
            const qList = await fetchQuestionsByQuiz(id);

            const answersList = await Promise.all(
                qList.map(async (qItem: Question) => {
                  const answers = await fetchAnswersByQuestion(qItem.id);
                  console.info('q', qItem, answers);
                  return {
                    ...qItem,
                    answers,
                  };
                })
            );

            return answersList;
        },
        enabled: !!id,
    });

    const formData = quizData && questions ? {
        quiz_name: quizData.title,
        quiz_author: 'beaverok',
        quiz_date: formatDate(quizData.created_at),
        quiz_image: quizData.image_url,
        description: quizData.description,
        department: quizData.id_departement,
        questions: questions!.map(q => ({
            text: q.content,
            answers: q.answers.map((a: Answer) => ({
                text: a.content,
                correct: a.is_correct,
            })),
        }))
    } : null;

    useEffect(() => {
        console.info('data', quizData, id)
    }, [id])
    
    return (
        <>
            {/* <div className="page-bg"></div> */}
            {!loadingQuiz && !loadingQuestions? <QuizForm data={formData}/> 
                : <Loader title="Récupération des données de quiz..." active={true} />}
        </>
    );
}