"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import QuizFormInput from "./QuizFormInput";
import QuizQuestionInput from "./QuizQuestionInput";
import { useMutation } from "@tanstack/react-query";
import fetchQuizCreate from "@/utils/fetcher/quiz/fetchQuizCreate";
import fetchQuestionCreate from "@/utils/fetcher/quiz/fetchQuestionCreate";
import fetchAnswerCreate from "@/utils/fetcher/quiz/fetchAnswerCreate";
import Quizz from "@/app/api/models/Quizz";
import Question from "@/app/api/models/Question";
import Answer from "@/app/api/models/Answer";
import Loader from '../Loader';

interface QuizQuestion {
    text: string;
    answers: {
        text: string;
        correct: boolean;
    }[];
}
interface QuizData {
    quiz_name: string;
    quiz_author: string;
    quiz_date: string;
    quiz_image: string;
    description: string;
    department: string;
    questions: QuizQuestion[];
}
interface QuizFormProps {
    data?: QuizData | null;
}

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
        const answers: { text: string; correct: boolean }[] = [];

        for (let j = 0; j < 4; j++) {
            const answerKey = `answer_${i}_${j}`;
            const answerText = formData[answerKey] as string;

            if (answerText !== undefined) {
                answers.push({
                    text: answerText,
                    correct: rightAnswerIndex === String(j)
                });
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
        description: formData.description as string,
        department: formData.department as string,
        quiz_image: formData.quiz_image as string,
        questions,
    };
}

function validateForm(isFormValid: boolean): boolean {
    document.querySelectorAll('[required]').forEach((input) => {
        const element = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        console.warn('form check',element.type);
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
        } else if (element.type === 'select-one') {
            const parent = element.closest('.form-line');

            if (element.value == "0") {
                parent?.classList.add('error');
            } else {
                console.warn(`Missing .form-line for: ${element.name}`);
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

    return isFormValid;
}

function checkValidFields() {
    document.querySelectorAll('input, textarea, select').forEach((el) => {
        el.addEventListener('change', () => {
            const parent = el.closest('.form-line');
            if (parent?.classList.contains('error')) {
                parent.classList.remove('error');
            }
    
            if ((el as HTMLInputElement).type === 'radio') {
                const group = document.querySelectorAll(`input[name="${(el as HTMLInputElement).name}"]`);
                group.forEach((radio) => {
                    const label = radio.closest('.check-label');
                    
                    if (label) {
                        label.classList.remove('error');
                    }
                });
            }
        });
    });
};

function showHideLoader(show: boolean) {
    const loader = document.querySelector('.loader-wrap');

    show ? loader?.classList.add('active') : loader?.classList.remove('active');
}

export default function QuizForm({ data }: QuizFormProps): React.JSX.Element {
    const mutation = useMutation({
        mutationFn: fetchQuizCreate,
        onSuccess: async (quizId: number, quizData) => {
            console.log("Quiz created:", quizId);
            console.warn("questions", quizData);
    
            try {
                quizData?.questions?.map(async (q, index) => {
                    const question = new Question({
                        "id_quizz": quizId,
                        "content": q.text as string,
                        "order_index": index + 1
                    });
                    const questionId: number = await fetchQuestionCreate(question);
    
                    if (questionId != null) {
                        q.answers.map(a => {
                            const answer = new Answer({
                                "id_quizz": quizId,
                                "id_question": questionId,
                                "content": a.text,
                                "is_correct": a.correct
                            });

                            fetchAnswerCreate(answer);
                        })
                    }
                })
    
                showHideLoader(false);
                console.log("All questions and answers created successfully");
            } catch (err) {
                console.error("Error creating questions or answers:", err);
            }
        },
    });
    
    const [questionNumber, setQuestionNumber] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false); 
    
    const router = useRouter();
    const userId = 3;
    const userName = "Jerome82";
    const departments = [{id: 2, name: "34 Hérault"}, {id: 4, name: "11 Aude"}]

    useEffect(() => {
        if (data && data.questions) {
          setQuestionNumber(data.questions.length);
        }
    }, [data]);

    const handleQuestionNumberChange = (value: number) => {
        setQuestionNumber(value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        checkValidFields();
        setShowSuccess(false);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData);

        let isFormValid = true;

        // Clear previous errors
        document.querySelectorAll('.form-line').forEach(line => line.classList.remove('error'));

        // Validate required fields
        if (!validateForm(isFormValid)) {
            return;
        }
        const res = transformFormData(formValues);
        console.log('res', res, formValues); 

        if (res) {
            const quiz = new Quizz({
                "id_user": userId,
                "title": res.quiz_name,
                "description": res.description,
                "id_departement": Number(res.department),
                "nbr_question": res.questions.length,
                "image_url": res.quiz_image,
                "is_custom": true,
                "questions": res.questions
            });
            showHideLoader(true);
            mutation.mutate(quiz);

            setShowSuccess(true);

            setTimeout(() => {
                router.push('/account/quizzes');
            }, 1000);
        }
    };

    useEffect(() => {
        const form = document.getElementById("quiz-create") as HTMLFormElement;
        if (form) {
          form.setAttribute("noValidate", "");
        }

        checkValidFields();
    }, []);

    return (
        <form id="quiz-create" className="quiz-form" onSubmit={handleSubmit}>
            <Loader title="Création est en cours..." />
            <div className="form-body">
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iName: 'quiz_name',
                        label: 'Nom du quizz',
                        iClass: '',
                        required: true,
                        defaultValue: data?.quiz_name ?? ''
                    }}
                />
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iClass: 'date',
                        iName: 'quiz_date',
                        label: 'Date de création',
                        defaultValue: data?.quiz_date ? data.quiz_date : getCurrentDate(),
                        readonly: true,
                    }}
                />
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iClass: '',
                        iName: 'quiz_author',
                        label: 'Nom du créateur',
                        required: true,
                        defaultValue: data?.quiz_author ?? userName
                    }}
                />
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iClass: '',
                        iName: 'quiz_image',
                        label: 'Url de l\'image',
                        required: true,
                        defaultValue: data?.quiz_image ?? ""
                    }}
                />
                <div className="form-line">
                    <label>Département</label>
                    <select name="department" required>
                        <option value="0">Choisir</option>
                        {departments.map((el, key) => 
                            <option value={el.id} key={key}>{el.name}</option>
                        )}
                    </select>
                </div>
                <div className="form-line">
                    <label>Description</label>
                    <textarea name="description" required></textarea>
                </div>
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
                                required: true,
                                defaultValue: data?.questions[index].text ?? '',
                                answers: data?.questions[index].answers ?? undefined
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="form-footer">
                {showSuccess && data == null ? <p className="note success levitate">Le quiz a été sauvegardé avec succès</p> : ''}
                {showSuccess && data != null ? <p className="note success levitate">Le quiz a été modifié avec succès</p> : ''}
                <button type="submit" className="btn">Confirmer</button>
            </div>
        </form>
    );
}