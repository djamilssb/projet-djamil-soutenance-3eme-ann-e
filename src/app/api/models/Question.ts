class Question {
    id?: number;
    idQuizz?: number;
    orderIndex?: number;
    content?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data?: Partial<Question>) {
        Object.assign(this, data)
    };

    public getId(): number | undefined {
        return this.id;
    };

    public getQuizzId(): number | undefined {
        return this.idQuizz;
    };
    
    public getOrderIndex(): number | undefined {
        return this.orderIndex;
    };

    public getContent(): string | undefined {
        return this.content;
    };

    public setOrderIndex(index: number): void {
        this.orderIndex = index;
    };

    public setContent(text: string): void {
        this.content = text;
    };
}

export default Question;