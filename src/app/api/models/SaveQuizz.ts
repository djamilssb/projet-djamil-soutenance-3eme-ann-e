class SaveQuizz {

    id?: number|undefined;
    id_user?: number|undefined;
    id_quizz?: number|undefined;
    id_character?: number|undefined;
    score?: number|undefined;
    created_at?: Date|undefined;


    constructor(data?: Partial<SaveQuizz>) {
        Object.assign(this, data)
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getIdUser(): number | undefined {
        return this.id_user;
    }

    public getIdQuizz(): number | undefined {
        return this.id_quizz;
    }

    public getIdCharacter(): number | undefined {
        return this.id_character;
    }

    public getScore(): number | undefined {
        return this.score;
    }

    public getCreatedAt(): Date | undefined {
        return this.created_at;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setIdUser(id_user: number): void {
        this.id_user = id_user;
    }

    public setIdQuizz(id_quizz: number): void {
        this.id_quizz = id_quizz;
    }

    public setIdCharacter(id_character: number): void {
        this.id_character = id_character;
    }

    public setScore(score: number): void {
        this.score = score;
    }

    public setCreatedAt(created_at: Date): void {
        this.created_at = created_at;
    }
}

export default SaveQuizz;