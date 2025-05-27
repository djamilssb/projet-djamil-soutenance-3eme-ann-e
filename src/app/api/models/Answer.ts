class Answer3 {
    id?: number;
    idQuizz?: number;
    idQuestion?: number;
    orderIndex?: number;
    content?: string;
    explication?: string;
    isCorrect?: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data?: any) {
        if (data) {
            this.id = data.id;
            this.idQuizz = data.id_quizz;
            this.idQuestion = data.id_question;
            this.orderIndex = data.order_index;
            this.content = data.content;
            this.explication = data.explication;
            this.isCorrect = Boolean(data.is_correct); // ← Conversion importante ici
            this.createdAt = data.created_at ? new Date(data.created_at) : undefined;
            this.updatedAt = data.updated_at ? new Date(data.updated_at) : undefined;
        }
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

export default Answer3;