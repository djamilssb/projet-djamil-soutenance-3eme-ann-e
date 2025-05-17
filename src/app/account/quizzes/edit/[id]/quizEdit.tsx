
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import QuizForm from "@/app/components/quizzes/QuizForm";

export default function QuizEdit(): React.JSX.Element {
    const data = {
        "quiz_name": "first quiz",
        "quiz_author": "beaverok",
        "quiz_date": "17/05/2025",
        "questions": [
            { 
                "text": "q1",
                "answers": [
                    {
                        "text": "a1",
                        "correct": true
                    },
                    {
                        "text": "a2",
                        "correct": false
                    },
                    {
                        "text": "a3",
                        "correct": false
                    },
                    {
                        "text": "a4",
                        "correct": false
                    }
                ]
            },
            {
                "text": "q2",
                "answers": [
                    {
                        "text": "r1",
                        "correct": false
                    },
                    {
                        "text": "r2",
                        "correct": true
                    },
                    {
                        "text": "r3",
                        "correct": false
                    },
                    {
                        "text": "r4",
                        "correct": false
                    }
                ]
            }
        ]
    }

    const { id } = useParams();
    const [quizData, setQuizData] = useState<any>(null);
    
    useEffect(() => {
        async function fetchData() {
            setQuizData(data);
        }
    
        if (id) fetchData();
    }, [id]);
    
    return (
        <>
            {/* <div className="page-bg"></div> */}
            {data ? <QuizForm data={quizData} /> : <p>Loading...</p>}
        </>
    );
}