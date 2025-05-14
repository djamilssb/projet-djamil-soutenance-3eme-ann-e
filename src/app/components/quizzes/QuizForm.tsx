"use client";
import React, { useState } from "react";
import QuizFormInput from "./QuizFormInput";
import QuizQuestionInput from "./QuizQuestionInput";

function getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');      
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();                           
  
    return `${day}/${month}/${year}`;
}

export default function QuizForm(): React.JSX.Element {
    const [questionNumber, setQuestionNumber] = useState(1);

    const handleQuestionNumberChange = (value: number) => {
        setQuestionNumber(value);
    };

    return (
        <form className="quiz-form">
            <div className="form-body">
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iName: 'quiz_name',
                        label: 'Nom du quizz',
                    }}
                />
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iClass: 'date',
                        iName: 'quiz_date',
                        label: 'Date de création',
                        defaultValue: getCurrentDate(),
                        readonly: true
                    }}
                />
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iName: 'quiz_author',
                        label: 'Nom du créateur',
                    }}
                />
                <QuizFormInput
                    props={{
                        iType: 'number',
                        iClass: 'q-number-wrap',
                        iName: 'q_number',
                        label: 'Nombre de question',
                        defaultValue: questionNumber,
                        onChange: handleQuestionNumberChange
                    }}
                />
                
                <div className="questions">
                    {Array.from({ length: questionNumber }, (_, index) => (
                        <QuizQuestionInput
                            key={index}
                            props={{
                                iType: 'text',
                                iName: `question_${index + 1}`,
                                label: `Question ${index + 1} :`,
                                iIndex: index + 1
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="form-footer">
                <button type="submit" className="btn">Confirmer</button>
            </div>
        </form>
    );
}