import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuizFormInput from "./QuizFormInput";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "@tanstack/react-query";
import fetchQuestionDelete from '../../../utils/fetcher/quiz/fetchQuestionDelete';
import showHideLoader from "@/utils/showHideLoader";
import fetchAnswerDelete from "@/utils/fetcher/quiz/fetchAnswerDelete";

interface Input {
    id?: number,
    iType: string,
    iClass?: string,
    iName: string,
    label: string,
    iIndex: number,
    required?: boolean,
    defaultValue?: string,
    answers?: {
        id?: number,
        text: string, 
        correct: boolean
    }[]
}
export default function QuizQuestionInput({ props, onDelete }: { props: Input, onDelete: Function}): React.JSX.Element {
    const answers = [1, 2, 3, 4];
    // console.info('data', props.answers);

    const mutation = useMutation<boolean, Error, number>({
        mutationFn: fetchQuestionDelete,
        onSuccess: async (_success, id) => {
            console.log("question deleted");
            
            try {
                if (props.answers?.length) {
                    await Promise.all(
                        props.answers.map((answer) => {
                            if (answer.id) {
                                return fetchAnswerDelete(answer.id);
                            }
                        })
                    );
    
                    console.log("All answers deleted successfully");
                }
    
                showHideLoader(false);
    
                // Notify parent
                onDelete(id);
            } catch (err) {
                console.error("Error deleting answers:", err);
            }
        },
    });
    
    const handleQuestionDelete = (qId: number): void => {
        showHideLoader(true);

        mutation.mutate(qId);
    }

    return (
        <div className="question-block">
            <div className={`form-line ${props.iClass}`}>
                <label htmlFor={props.iName}>
                    {props.label}
                    {props.id && props.id > 0 ? <button onClick={() => props.id ? handleQuestionDelete(props.id) : ''}><FontAwesomeIcon icon={faTrash} title="Supprimer la question" /></button> : ''}
                </label>
                <input 
                    type={props.iType} 
                    id={props.iName} 
                    name={props.iName} 
                    defaultValue={props.defaultValue} 
                    required={props.required} 
                />
            </div>
            {answers.map((_, index) => (
                <div className="answer-wrap" key={index}>
                    <QuizFormInput 
                        props={{
                            iType: 'text',
                            iClass: 'answer',
                            iName: `answer_${props.iIndex}_${index}`,
                            label: `Réponse ${index + 1} :`,
                            required: true,
                            defaultValue: props.answers != undefined && props.answers?.length > 0 ? props.answers[index].text : ''
                        }}
                    />
                    <label className="check-label">
                        <input 
                            type="radio" 
                            name={`right-${props.iIndex}`} 
                            defaultValue={index}
                            required
                            checked={props.answers && props.answers.length > 0 && props.answers[index].correct ? true : false}
                        />
                        <span>Vrai</span>
                    </label>
                </div>
            ))}
        </div>
    );
}