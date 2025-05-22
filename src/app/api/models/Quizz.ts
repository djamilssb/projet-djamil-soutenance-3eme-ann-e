class Quizz {
    id?: number;
    id_user?: number;
    id_departement?: number;
    title?: string;
    description?: string;
    is_custom?: boolean;
    nbr_question?: number;
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

    public getNbrQuestions(): number | undefined {
        return this.nbr_question;
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

    public setNbrQuestions(nbr_questions: number): void {
        this.nbr_question = nbr_questions;
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
            nbr_question: this.nbr_question,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

export default Quizz;