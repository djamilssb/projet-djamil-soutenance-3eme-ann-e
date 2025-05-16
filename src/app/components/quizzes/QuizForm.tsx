"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import QuizFormInput from "./QuizFormInput";
import QuizQuestionInput from "./QuizQuestionInput";

function getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');      
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();                           
  
    return `${day}/${month}/${year}`;
}

function transformFormData(formData: { [k: string]: FormDataEntryValue }) {
    const questionCount = Number(formData.q_number);
    const questions = [];

    // group questions with answers
    for (let i = 1; i <= questionCount; i++) {
        const questionKey = `question_${i}` as string;
        const rightAnswerIndex = formData[`right-${i}`] as string;

        const questionText = formData[questionKey];
        const answers: { [key: string]: { text: string; correct: boolean } } = {};

        for (let j = 0; j < 4; j++) {
            const answerKey = `answer_${i}_${j}`;
            const answerText = formData[answerKey] as string;

            if (answerText !== undefined) {
                answers[`${j + 1}`] = {
                    text: answerText,
                    correct: rightAnswerIndex === String(j)
                };
            }
        }

        questions.push({
            text: questionText,
            answers,
        });
    }
  
    return {
        quiz_name: formData.quiz_name as string,
        quiz_author: formData.quiz_author as string,
        quiz_date: formData.quiz_date as string,
        questions,
    };
}

export default function QuizForm(): React.JSX.Element {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false); 
    const router = useRouter();

    const handleQuestionNumberChange = (value: number) => {
        setQuestionNumber(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowSuccess(false);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData);

        let isFormValid = true;

        // Clear previous errors
        document.querySelectorAll('.form-line').forEach(line => line.classList.remove('error'));

        // Validate required fields
        document.querySelectorAll('[required]').forEach((input) => {
            const element = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
            console.info(element);
            // For radio buttons, only validate the group once
            if (element.type === 'radio') {
                const name = element.name;
                const group = document.querySelectorAll(`input[name="${name}"]`);
                const oneChecked = Array.from(group).some((radio) => (radio as HTMLInputElement).checked);
          
                if (!oneChecked) {
                    group.forEach((radio) => {
                        const checkLabel = radio.closest('.check-label');
                        if (checkLabel) {
                            checkLabel.classList.add('error');
                        } else {
                            console.warn(`Missing .check-label for radio group: ${name}`);
                        }
                    });
                  isFormValid = false;
                }
            } else {
                const parent = element.closest('.form-line');
                if (!element.value.trim()) {
                    if (parent) {
                        parent.classList.add('error');
                    } else {
                        console.warn(`Missing .form-line for: ${element.name}`);
                    }
                    isFormValid = false;
                }
            }
        });

        if (!isFormValid) {
            return;
        }
        const res = transformFormData(formValues);
        console.log('res', res, formValues); 

        if (res) {
            setShowSuccess(true);

            setTimeout(() => {
                router.push('/account/quizzes');
            }, 500);
        }
    };

    return (
        <form className="quiz-form" onSubmit={handleSubmit}>
            <div className="form-body">
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iName: 'quiz_name',
                        label: 'Nom du quizz',
                        iClass: '',
                        required: true
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
                        iClass: '',
                        iName: 'quiz_author',
                        label: 'Nom du créateur',
                        required: true
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
                                iClass: '',
                                iName: `question_${index + 1}`,
                                label: `Question ${index + 1} :`,
                                iIndex: index + 1,
                                required: true
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="form-footer">
                {showSuccess ? <p className="note success levitate">Le quiz a été sauvegardé avec succès</p> : ''}
                <button type="submit" className="btn">Confirmer</button>
            </div>
        </form>
    );
}