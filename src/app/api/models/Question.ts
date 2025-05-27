class Question {
    id?: number;
    id_quizz?: number;
    order_index?: number;
    content?: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<Question>) {
        Object.assign(this, data)
    };

    public getId(): number | undefined {
        return this.id;
    };

    public getQuizzId(): number | undefined {
        return this.id_quizz;
    };
    
    public getOrderIndex(): number | undefined {
        return this.order_index;
    };

    public getContent(): string | undefined {
        return this.content;
    };

    public setOrderIndex(index: number): void {
        this.order_index = index;
    };

    public setContent(text: string): void {
        this.content = text;
    };

    public toJSON(): object {
        return {
            id: this.id,
            id_quizz: this.id_quizz,
            content: this.content,
            order_index: this.order_index,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

export default Question;