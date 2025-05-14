import React from 'react';

interface Input {
    iType: string,
    iClass?: string,
    iName: string,
    label: string,
    defaultValue?: any,
    readonly?: boolean,
    onChange?: (value: number) => void
}
export default function QuizFormInput({ props }: { props: Input}): React.JSX.Element {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = Number(e.target.value);

        if (props.onChange) {
            props.onChange(newVal);
        }
    };

    return (
        <div className={`form-line ${props.iClass}`}>
            <label htmlFor={props.iName}>{props.label}</label>
            {props.iType === 'number' ? (
                <input
                    type={props.iType}
                    id={props.iName}
                    name={props.iName}
                    min="1"
                    value={props.defaultValue}
                    onChange={handleChange}
                />
            ) : (
                <input
                    type={props.iType}
                    id={props.iName}
                    name={props.iName}
                    value={props.defaultValue}
                    readOnly={props.readonly}
                />
            )}
        </div>
    );
}