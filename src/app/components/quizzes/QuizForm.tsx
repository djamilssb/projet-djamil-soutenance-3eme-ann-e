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
import showHideLoader from "@/utils/showHideLoader";
import fetchQuizUpdate from "@/utils/fetcher/quiz/fetchQuizUpdate";
import fetchQuestionUpdate from "@/utils/fetcher/quiz/fetchQuestionUpdate";
import fetchAnswerUpdate from "@/utils/fetcher/quiz/fetchAnswerUpdate";

interface QuizQuestion {
    id?: number,
    text: string;
    answers: {
        id?: number,
        text: string;
        correct: boolean;
    }[];
}
interface QuizData {
    quiz_id?: string;
    quiz_name: string;
    quiz_author: string;
    quiz_date: string;
    quiz_image: string;
    description: string;
    department: string;
}
interface QuizFormProps {
    data?: QuizData | null;
}

// transforms timestamp from bdd to input date format
function getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');      
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const year = today.getFullYear();                           
  
    return `${day}/${month}/${year}`;
}

/**
 * Checks if all required fields are filled
 * @returns true or false if the form is valid or not
 */
function validateForm(): boolean {
    let isFormValid = true;

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
        } else if (element.type === 'select-one') { // select validation
            const parent = element.closest('.form-line');

            if (element.value == "0") {
                parent?.classList.add('error');
            } else {
                console.warn(`Missing .form-line for: ${element.name}`);
            }
        } else { // others validation
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

/**
 * Check if all required fields are filled and delete errors
 */
function checkValidFields(): void {
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

export default function QuizForm({ data }: QuizFormProps): React.JSX.Element {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questionsList, setQuestionsList] = useState<QuizQuestion[]>([]);
    const [showSuccess, setShowSuccess] = useState(false); 
    
    const router = useRouter();
    const userId = 3;
    const userName = "Jerome82";
    const departments = [{id: 2, name: "34 Hérault"}, {id: 4, name: "11 Aude"}]
    
    /**
     * Transforms form data to necessary format to create quiz
     * @param formData 
     * @returns quiz object
     */
    function transformFormData(formData: { [k: string]: FormDataEntryValue }): {data: QuizData, questions: QuizQuestion[]} {
        const questionCount = Number(formData.q_number);
        const questions: QuizQuestion[] = [];

        // group questions with answers
        for (let i = 1; i <= questionCount; i++) {
            const questionKey = `question_${i}` as string;
            const rightAnswerIndex = formData[`right-${i}`] as string;

            const questionText = formData[questionKey] as string;
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

        console.info('q list', questions);
    
        return {
            data: {
                quiz_id: formData.quiz_id as string,
                quiz_name: formData.quiz_name as string,
                quiz_author: formData.quiz_author as string,
                quiz_date: formData.quiz_date as string,
                description: formData.description as string,
                department: formData.department as string,
                quiz_image: formData.quiz_image as string,
            },
            questions: questions
        };
    }
    /**
     * Mutate function for quiz creation
     * After quiz is created we receive it's id and pass it to create questions
     * For every question we receive it's id and pass it to create answers
     * @param mutationFn - function for quiz create
     * @param onSuccess - functions for creating questions and answers
     */
    const mutation = useMutation({
        mutationFn: fetchQuizCreate,
        onSuccess: async (quizId: number, quizData, qList) => {
            console.log("Quiz created:", quizId);
            console.warn("questions", questionsList);
    
            try {
                // go through every question to create it and get it id
                questionsList.map(async (question, index) => {
                    const newQuestion = new Question({
                        "id_quizz": quizId,
                        "content": question.text as string,
                        "order_index": index + 1
                    });
                    const questionId: number = await fetchQuestionCreate(newQuestion);
    
                    if (questionId != null) {
                        // if there is an id we create answers for each question
                        question.answers.map(answer => {
                            const newAnswer = new Answer({
                                "id_quizz": quizId,
                                "id_question": questionId,
                                "content": answer.text,
                                "is_correct": answer.correct
                            });

                            fetchAnswerCreate(newAnswer);
                        })
                    }
                })
    
                // hide loader and show success message
                showHideLoader(false);
                setShowSuccess(true);

                // redirect to quiz list page
                setTimeout(() => {
                    router.push('/account/quizzes');
                }, 3000);

                console.log("All questions and answers created successfully");
            } catch (err) {
                console.error("Error creating questions or answers:", err);
            }
        },
    });

    const updateQuizMutation = useMutation({
        mutationFn: fetchQuizUpdate,
        onSuccess: async (_success, variables) => {
            const { id: quizId, data: quizData } = variables;
            console.log("Quiz updated:", quizId);
    
            try {
                for (const [index, q] of questionsList.entries() ?? []) {
                    if (q.id) {
                        // update question and answers if we found question id
                        const question = new Question({
                            id: q.id,
                            id_quizz: quizId,
                            content: q.text as string,
                            order_index: index + 1
                        });

                        await fetchQuestionUpdate(question);

                        for (const a of q.answers) {
                            const answer = new Answer({
                                id: a.id,
                                id_quizz: quizId,
                                id_question: q.id,
                                content: a.text,
                                is_correct: a.correct
                            });
    
                            await fetchAnswerUpdate(answer);
                        }
                    } else {
                        // add new questions and answers
                        const question = new Question({
                            id_quizz: quizId,
                            content: q.text as string,
                            order_index: index + 1
                        });

                        const questionId = await fetchQuestionCreate(question);
    
                        if (questionId != null) {
                            for (const a of q.answers) {
                                const answer = new Answer({
                                    id_quizz: quizId,
                                    id_question: questionId,
                                    content: a.text,
                                    is_correct: a.correct
                                });
        
                                await fetchAnswerCreate(answer);
                            }
                        }
                    }
                }
    
                showHideLoader(false);
                setShowSuccess(true);

                // setTimeout(() => {
                //     router.push('/account/quizzes');
                // }, 3000);

                console.log("All questions and answers updated/created successfully");
            } catch (err) {
                console.error("Error updating/creating questions or answers:", err);
            }
        },
    });

    // we check if there is data with quiz or not
    // if there is data this is quiz update form, if not quiz creation form
    // useEffect(() => {
    //     if (data && questionsList.length > 0) {
    //         setQuestonsList(data.questions);
    //         setQuestionNumber(data.questions.length);
    //     }
    // }, [data]);

    useEffect(() => {
        console.log('Questions list updated:', questionsList);
    }, [questionsList]);

    // if js is on we add noValidate to the form to have js validation
    useEffect(() => {
        const form = document.getElementById("quiz-create") as HTMLFormElement;
        if (form) {
          form.setAttribute("noValidate", "");
        }

        checkValidFields();
    }, []);
    
    const handleQuestionNumberChange = (value: number): void => {
        setQuestionNumber(value);
    };

    /**
     * Get all form fields on submit and create quiz
     * @param e  - form element
     */
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        checkValidFields();
        setShowSuccess(false);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData);

        // Clear previous errors
        document.querySelectorAll('.form-line').forEach(line => line.classList.remove('error'));

        // Validate required fields
        if (!validateForm()) {
            return;
        }
        const res = transformFormData(formValues);
        console.log('res', res, questionsList); 

        if (res) {
            const quiz = new Quizz({
                "id_user": userId,
                "title": res.data.quiz_name,
                "description": res.data.description,
                "id_departement": Number(res.data.department),
                "nbr_question": questionsList.length,
                "image_url": res.data.quiz_image,
                "is_custom": true,
            });

            setQuestionsList(res.questions);
            showHideLoader(true);
            mutation.mutate(quiz);
        }
    };

    /**
     * Update questions list after deleting
     * @param id - deleted question
     */
    const updateQuestionsList = (id: number): void => {
        console.info('deleting question...', id);

        if (!data || questionsList.length == 0) return;

        const updatedQuestions = questionsList.filter(q => q.id !== id);

        setQuestionsList(updatedQuestions);
        setQuestionNumber(updatedQuestions.length || 1);
    };

    /**
     * Get all form fields when updating quiz
     * @param e - form element
     * @returns nothing
     */
    const handleModify = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.info('form modify');

        checkValidFields();
        setShowSuccess(false);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData);

        // Clear previous errors
        document.querySelectorAll('.form-line').forEach(line => line.classList.remove('error'));

        // Validate required fields
        if (!validateForm()) {
            return;
        }
        const res = transformFormData(formValues);

        if (res) {
            const quiz = new Quizz({
                "id_user": userId,
                "title": res.data.quiz_name,
                "description": res.data.description,
                "id_departement": Number(res.data.department),
                "nbr_question": questionsList.length,
                "image_url": res.data.quiz_image,
                "is_custom": true,
            });
            showHideLoader(true);
            // updateQuizMutation.mutate({ id: Number(res.quiz_id), data: quiz, questions: res.questions });
        }
    }

    return (
        <form id="quiz-create" className="quiz-form" onSubmit={data ? handleModify : handleSubmit}>
            <Loader title={data ? "Modification est en cours..." : "Création est en cours..."} />
            <div className="form-body">
                {/* get quiz id */}
                {data ? <input type="hidden" name="quiz_id" value={data.quiz_id} /> : null}

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
                            <option value={el.id} key={key} selected={el.id.toString() == data?.department}>{el.name}</option>
                        )}
                    </select>
                </div>
                <div className="form-line">
                    <label>Description</label>
                    <textarea name="description" required defaultValue={data?.description ?? ''}></textarea>
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
                                id: questionsList?.[index]?.id || 0,
                                iType: 'text',
                                iClass: '',
                                iName: `question_${index + 1}`,
                                label: `Question ${index + 1} :`,
                                iIndex: index + 1,
                                required: true,
                                defaultValue: questionsList?.[index]?.text || '',
                                answers: questionsList?.[index]?.answers ?? []
                            }}
                            onDelete={updateQuestionsList}
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