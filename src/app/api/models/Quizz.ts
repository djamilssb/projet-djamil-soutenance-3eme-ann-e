class Quizz {
    id?: number;
    id_user?: number;
    id_departement?: number;
    title?: string;
    description?: string;

    is_custom?: boolean;          
    nbr_question?: number;       
    is_active?: number;           
    image_url?: string;           
    created_at?: Date;
    updated_at?: Date;
    questions?: { text: FormDataEntryValue; answers: { text: string; correct: boolean; }[]; }[];


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

    public getIsCustom(): boolean | undefined {
        return this.is_custom;
    }

    public getNbrQuestion(): number | undefined {
        return this.nbr_question;
    }

    public getIsActive(): number | undefined {
        return this.is_active;
    }


    public getImageUrl(): string | undefined {
        return this.image_url;
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

    public setIsCustom(is_custom: boolean): void {
        this.is_custom = is_custom;
    }

    public setNbrQuestion(nbr_question: number): void {
        this.nbr_question = nbr_question;
    }

    public setIsActive(is_active: number): void {
        this.is_active = is_active;
    }

    public setImageUrl(image_url: string): void {
        this.image_url = image_url;

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

            is_custom: this.is_custom,
            nbr_question: this.nbr_question,
            is_active: this.is_active,

            image_url: this.image_url,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}

export default Quizz;