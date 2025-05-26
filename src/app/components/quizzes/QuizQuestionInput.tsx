import QuizFormInput from "./QuizFormInput";

interface Input {
    iType: string,
    iClass?: string,
    iName: string,
    label: string,
    iIndex: number,
    required?: boolean,
    defaultValue?: string,
    answers?: {
        text: string, 
        correct: boolean
    }[]
}
export default function QuizQuestionInput({ props }: { props: Input}): React.JSX.Element {
    const answers = [1, 2, 3, 4];
    // console.info('data', props.answers);
    return (
        <div className="question-block">
            <div className={`form-line ${props.iClass}`}>
                <label htmlFor={props.iName}>{props.label}</label>
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
                            defaultValue: props.answers != undefined ? props.answers[index].text : ''
                        }}
                    />
                    <label className="check-label">
                        <input 
                            type="radio" 
                            name={`right-${props.iIndex}`} 
                            defaultValue={index}
                            required
                            defaultChecked={props.answers != undefined ? props.answers[index].correct : undefined}
                        />
                        <span>Vrai</span>
                    </label>
                </div>
            ))}
        </div>
    );
}