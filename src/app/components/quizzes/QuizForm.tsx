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
    answers?: {
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

export default function QuizForm({ formData }: { formData: {data: QuizData, questions: QuizQuestion[]} | null }): React.JSX.Element {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [questionsList, setQuestionsList] = useState<QuizQuestion[]>([]);
    const [answersList, setAnswersList] = useState<{id?: number, text: string, correct: boolean}[]>([]);
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
     * Transforms form data after updating quiz
     * @param formData
     * @returns quiz object
     */
    function transformFormEditData(formData: { [k: string]: FormDataEntryValue }): { data: QuizData, questions: QuizQuestion[] } {
        const questions: QuizQuestion[] = [];
        const answers: {id?: number, text: string, correct: boolean}[] = [];
        
        // Extract all unique question IDs from both `question_*` and `answer_*` keys
        const questionIds = new Set<number>();
        const answerIds = new Set<number>();
        // TODO const newQuestions: string[] = [];
        // TODO const newAnswers: string[] = [];
        const rightAnswerIds = [];
        
        Object.keys(formData).forEach(key => {
            // Check for question keys (e.g., "question_15")
            if (key.startsWith('question_')) {
                const partQ = key.split('_');
                const questionId = parseInt(partQ[1]);
                if (!isNaN(questionId) && partQ.length == 2) questionIds.add(questionId);
                // TODO if (partQ.length > 2) newQuestions.push(key);
            }
            // Check for answer keys (e.g., "answer_15")
            else if (key.startsWith('answer_')) {
                const partA = key.split('_');
                const answerId = parseInt(partA[1]);
                if (!isNaN(answerId) && partA.length == 2) answerIds.add(answerId);
                // TODO if (partA.length > 2) newAnswers.push(key);
            }
        });
        
        // Process each question for update
        for (const questionId of questionIds) {
            const questionKey = `question_${questionId}`;
            
            const questionText = formData[questionKey] as string;
            
            // Skip if required fields are missing
            if (!questionText) continue;
            
            questions.push({
                id: questionId,  // Keep the original ID
                text: questionText
            });
        }

        // Process each answer for update
        let cnt = 1;
        for (const answerId of answerIds) {
            const answerKey = `answer_${answerId}`;
            const rightAnswerKey = `right-${cnt}`;
            
            const answerText = formData[answerKey] as string;
            const rightAnswerIndex = formData[rightAnswerKey] as string;
            
            // Skip if required fields are missing
            if (!answerText) continue;

            if (rightAnswerIndex !== undefined) rightAnswerIds.push(formData[rightAnswerKey]);
            
            answers.push({
                id: answerId,  
                text: answerText,
                correct: rightAnswerIds.includes(answerId.toString()),
            });

            cnt++;
        }

        // TODO: Process new question
        /*
        let rightIndexes = [];
        for (const questionId of newQuestions) {
            // rightIndexes.push(`right-${questionId}`);

            const questionText = formData[questionId] as string;
            
            // Skip if required fields are missing
            if (!questionText) continue;
            
            questions.push({
                text: questionText
            });
        }*/

        // TODO: Process new answer
        /*
        let cntA = 1;
        for (const answerId of newAnswers) {
            const answerText = formData[answerId] as string;
            
            if (!answerText) continue;
            
            answers.push({
                text: answerText,
                correct: rightAnswerIds.includes(answerId.toString()),
            });

            cntA++;
        }*/

        console.info('new data', questions, answers);
        setAnswersList(answers);
        
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
            questions,
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
        onSuccess: async (quizId: number) => {
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
                        question?.answers?.map(answer => {
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
            const { id: quizId, data} = variables;
            console.log("Quiz updated:", quizId);
    
            try {
                for (const [index, question] of questionsList.entries() ?? []) {
                    console.info('fetch question update', question);
                    if (question.id) {
                        // update questions and answers if we found question id
                        const updatedQuestion = new Question({
                            id: question.id,
                            id_quizz: quizId,
                            content: question.text as string,
                            order_index: index + 1
                        });

                        await fetchQuestionUpdate(updatedQuestion);

                        for (const answer of answersList) {
                            const updatedAnswer = new Answer({
                                id: answer.id,
                                content: answer.text,
                                is_correct: answer.correct
                            });
    
                            await fetchAnswerUpdate(updatedAnswer);
                        }
                    } 
                    // TODO
                    /*else {
                        // add new questions and answers
                        const newQuestion = new Question({
                            id_quizz: quizId,
                            content: question.text as string,
                            order_index: index + 1
                        });

                        const questionId = await fetchQuestionCreate(newQuestion);

                        console.info('add new question', questionId, quizId);
                        console.info('answers', answersList);
    
                        if (questionId != null) {
                            for (const answer of answersList) {
                                const newAnswer = new Answer({
                                    id_quizz: quizId,
                                    id_question: questionId,
                                    content: answer.text,
                                    is_correct: answer.correct
                                });
        
                                await fetchAnswerCreate(newAnswer);
                            }
                        }
                    }*/
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
    useEffect(() => {
    if (formData && formData.questions.length > 0) {
        setQuestionsList(formData.questions);
        setQuestionNumber(formData.questions.length);
    }
}, [formData]);

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

        if (!formData || questionsList.length == 0) return;

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
        const res = transformFormEditData(formValues);

        if (res) {
            const quizModified = new Quizz({
                "id_user": userId,
                "title": res.data.quiz_name,
                "description": res.data.description,
                "id_departement": Number(res.data.department),
                "nbr_question": questionsList.length,
                "image_url": res.data.quiz_image,
                "is_custom": true,
            });
            showHideLoader(true);
            setQuestionsList(res.questions)
            updateQuizMutation.mutate({ id: Number(res.data.quiz_id), data: quizModified });
        }
    }

    return (
        <form id="quiz-create" className="quiz-form" onSubmit={formData ? handleModify : handleSubmit}>
            <Loader title={formData ? "Modification est en cours..." : "Création est en cours..."} />
            <div className="form-body">
                {/* get quiz id */}
                {formData ? <input type="hidden" name="quiz_id" value={formData.data.quiz_id} /> : null}

                <QuizFormInput
                    props={{
                        iType: 'text',
                        iName: 'quiz_name',
                        label: 'Nom du quizz',
                        iClass: '',
                        required: true,
                        defaultValue: formData?.data.quiz_name ?? ''
                    }}
                />
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iClass: 'date',
                        iName: 'quiz_date',
                        label: 'Date de création',
                        defaultValue: formData?.data.quiz_date ? formData.data.quiz_date : getCurrentDate(),
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
                        defaultValue: formData?.data.quiz_author ?? userName
                    }}
                />
                <QuizFormInput
                    props={{
                        iType: 'text',
                        iClass: '',
                        iName: 'quiz_image',
                        label: 'Url de l\'image',
                        required: true,
                        defaultValue: formData?.data.quiz_image ?? ""
                    }}
                />
                <div className="form-line">
                    <label>Département</label>
                    <select name="department" required>
                        <option value="0">Choisir</option>
                        {departments.map((el, key) => 
                            <option value={el.id} key={key} selected={el.id.toString() == formData?.data.department}>{el.name}</option>
                        )}
                    </select>
                </div>
                <div className="form-line">
                    <label>Description</label>
                    <textarea name="description" required defaultValue={formData?.data.description ?? ''}></textarea>
                </div>
                <QuizFormInput
                    props={{
                        iType: 'number',
                        iClass: 'q-number-wrap',
                        iName: 'q_number',
                        label: 'Nombre de question',
                        defaultValue: formData?.questions.length ?? questionNumber,
                        readonly: formData?.questions.length ? true : false,
                        onChange: handleQuestionNumberChange
                    }}
                />
                
                <div className="questions">
                    {Array.from({ length: questionNumber }, (_, index) => (
                        <QuizQuestionInput
                            key={index}
                            props={{
                                id: formData?.questions?.[index]?.id || 0,
                                iType: 'text',
                                iClass: '',
                                iName: formData?.questions?.[index]?.id ? `question_${formData?.questions?.[index]?.id}` : `question_${index + 1}`,
                                label: `Question ${index + 1} :`,
                                iIndex: index + 1,
                                required: true,
                                defaultValue: formData?.questions?.[index]?.text || '',
                                answers: formData?.questions?.[index]?.answers ?? []
                            }}
                            onDelete={updateQuestionsList}
                        />
                    ))}
                </div>
            </div>
            <div className="form-footer">
                {showSuccess && formData == null ? <p className="note success levitate">Le quiz a été sauvegardé avec succès</p> : ''}
                {showSuccess && formData != null ? <p className="note success levitate">Le quiz a été modifié avec succès</p> : ''}
                <button type="submit" className="btn">Confirmer</button>
            </div>
        </form>
    );
}