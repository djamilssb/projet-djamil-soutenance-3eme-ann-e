class Quizz {
    id?: number;
    id_user?: number;
    id_departement?: number;
    title?: string;
    description?: string;
    type?: string;
    nbr_questions?: number;
    difficukty_level?: string;  // Note: there's a typo here from the original code
    created_at?: Date;
    updated_at?: Date;

    constructor(data?: Partial<Quizz>) {
        Object.assign(this, data)
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getIdUser(): number | undefined {
        return this.id_user;
    }

    public getIdDepartement(): number | undefined {
        return this.id_departement;
    }

    public getTitle(): string | undefined {
        return this.title;
    }

    public getDescription(): string | undefined {
        return this.description;
    }

    public getType(): string | undefined {
        return this.type;
    }

    public getNbrQuestions(): number | undefined {
        return this.nbr_questions;
    }

    public getDifficuktyLevel(): string | undefined {
        return this.difficukty_level;
    }

    public getCreatedAt(): Date | undefined {
        return this.created_at;
    }

    public getUpdatedAt(): Date | undefined {
        return this.updated_at;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setIdUser(id_user: number): void {
        this.id_user = id_user;
    }

    public setIdDepartement(id_departement: number): void {
        this.id_departement = id_departement;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public setType(type: string): void {
        this.type = type;
    }

    public setNbrQuestions(nbr_questions: number): void {
        this.nbr_questions = nbr_questions;
    }

    public setDifficuktyLevel(difficukty_level: string): void {
        this.difficukty_level = difficukty_level;
    }

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    }

    public setUpdatedAt(updated_at: Date): void {
        this.updated_at = updated_at;
    }

    public toJSON(): object {
        return {
            id: this.id,
            id_user: this.id_user,
            id_departement: this.id_departement,
            title: this.title,
            description: this.description,
            type: this.type,
            nbr_questions: this.nbr_questions,
            difficukty_level: this.difficukty_level,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

export default Quizz;