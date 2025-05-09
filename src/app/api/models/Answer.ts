class Answer {
    id?: number;
    idQuizz?: number;
    idQuestion?: number;
    orderIndex?: number;
    content?: string;
    explication?: string;
    isCorrect?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data?: Partial<Answer>) {
        Object.assign(this, data)
    };

    public getId(): number | undefined {
        return this.id;
    };

    public getQuizzId(): number | undefined {
        return this.idQuizz;
    };

    public getQuestionId(): number | undefined {
        return this.idQuestion;
    };
    
    public getOrderIndex(): number | undefined {
        return this.orderIndex;
    };

    public getContent(): string | undefined {
        return this.content;
    };

    public getExplication(): string | undefined {
        return this.explication;
    };

    public getIsCorrect(): boolean | undefined {
        return this.isCorrect;
    };

    public setOrderIndex(index: number): void {
        this.orderIndex = index;
    };

    public setContent(text: string): void {
        this.content = text;
    };

    public setExplication(text: string): void {
        this.explication = text;
    };
}

export default Answer;