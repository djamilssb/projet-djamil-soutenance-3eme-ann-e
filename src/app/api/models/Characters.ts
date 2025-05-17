class Characters {
    id?: number;
    id_quiz?: number;
    name?: string;
    image_url?: string;
    created_at?: Date;

    constructor(data: Partial<Characters>) {
        Object.assign(this, data);
        this.created_at = new Date(data.created_at || new Date());
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getIdQuiz(): number | undefined {
        return this.id_quiz;
    }

    public getName(): string | undefined {
        return this.name;
    }

    public getImageUrl(): string | undefined {
        return this.image_url;
    }

    public getCreatedAt(): Date | undefined {
        return this.created_at;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setIdQuiz(id_quiz: number): void {
        this.id_quiz = id_quiz;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setImageUrl(image_url: string): void {
        this.image_url = image_url;
    }

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    }

    toJSON() {
        return {
            id: this.id,
            id_quiz: this.id_quiz,
            name: this.name,
            image_url: this.image_url,
            created_at: this.created_at?.toISOString(),
        };
    }
}

export default Characters;
