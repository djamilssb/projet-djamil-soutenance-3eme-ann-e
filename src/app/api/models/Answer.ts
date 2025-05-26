class Answer {
    id?: number;
    id_quizz?: number;
    id_question?: number;
    order_index?: number;
    content?: string;
    explication?: string;
    is_correct?: boolean;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<Answer>) {
        Object.assign(this, data)
    };

    public getId(): number | undefined {
        return this.id;
    };

    public getQuizzId(): number | undefined {
        return this.id_quizz;
    };

    public getQuestionId(): number | undefined {
        return this.id_question;
    };
    
    public getOrderIndex(): number | undefined {
        return this.order_index;
    };

    public getContent(): string | undefined {
        return this.content;
    };

    public getExplication(): string | undefined {
        return this.explication;
    };

    public getIsCorrect(): boolean | undefined {
        return this.is_correct;
    };

    public setOrderIndex(index: number): void {
        this.order_index = index;
    };

    public setContent(text: string): void {
        this.content = text;
    };

    public setExplication(text: string): void {
        this.explication = text;
    };

    public toJSON(): object {
        return {
            id: this.id,
            id_quizz: this.id_quizz,
            id_question: this.id_question,
            content: this.content,
            explication: this.explication,
            is_correct: this.is_correct,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

export default Answer;