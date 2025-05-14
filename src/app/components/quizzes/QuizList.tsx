"use client";

import { useState } from "react";
import QuizListItem from './QuizListItem';
import Link from "next/link";

export default function QuizList(): React.JSX.Element {
    const [quizList, setQuizList] = useState([{'title': 'London2012', 'date': '22/01/2025', 'userName': 'Jerome82'}]);

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
                    <div className="list-body">
                        {quizList.map((quiz, index) =>
                            <QuizListItem key={index} title={quiz.title} date={quiz.date} userName={quiz.userName}/>
                        )}
                    </div>
                </div>
            </div>
            <div className="list-footer">
                <Link href="/account/quizzes/create" className="btn big-btn">Créer un nouveau quizz</Link>
            </div>
        </div>
    );
}