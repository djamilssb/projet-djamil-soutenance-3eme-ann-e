import QuizFormInput from "./QuizFormInput";

interface Input {
    iType: string,
    iClass?: string,
    iName: string,
    label: string,
    iIndex: number
}
export default function QuizQuestionInput({ props }: { props: Input}): React.JSX.Element {
    const answers = [1, 2, 3, 4];
    return (
        <div className="question-block">
            <div className={`form-line ${props.iClass}`}>
                <label htmlFor={props.iName}>{props.label}</label>
                <input type={props.iType} id={props.iName} name={props.iName} />
            </div>
            {answers.map((_, index) => (
                <div className="answer-wrap" key={index}>
                    <QuizFormInput 
                        props={{
                            iType: 'text',
                            iClass: 'answer',
                            iName: `answer-${props.iIndex}-${index}`,
                            label: `Réponse ${index + 1} :`,
                        }}
                    />
                    <label className="check-label">
                        <input type="radio" name={`right-${props.iIndex}`} value={index} />
                        <span>Vrai</span>
                    </label>
                </div>
            ))}
        </div>
    );
}