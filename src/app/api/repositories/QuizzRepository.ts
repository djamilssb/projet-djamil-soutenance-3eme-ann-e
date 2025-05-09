import executeQuery from "@/utils/executeQuery";
import Quizz from "../models/Quizz";

class QuizzRepository {
    constructor() {}

    public async getAll(): Promise<Quizz[]> {
        const rows = await executeQuery("SELECT * FROM quizz", []);
        return rows.map((row: object) => new Quizz(row));
    }

    public async getById(id: number): Promise<Quizz | null> {
        const row = await executeQuery("SELECT * FROM quizz WHERE id = ?", [id]);
        if (row.length === 0) return null;
        return new Quizz(row[0]);
    }

    public async create(quizz: Partial<Quizz>): Promise<boolean> {
        const newQuizz = quizz;
        const result = await executeQuery("INSERT INTO quizz SET ?", [newQuizz]);
        return result.affectedRows > 0;
    }

    public async update(id: number, quizz: Partial<Quizz>): Promise<boolean> {
        const quizzId = id;
        const updatedQuizz = quizz;
        const result = await executeQuery("UPDATE quizz SET ? WHERE id = ?", [
            updatedQuizz,
            quizzId,
        ]);
        return result.affectedRows > 0;
    }

    public async delete(id: number): Promise<boolean> {
        const result = await executeQuery("DELETE FROM quizz WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }

    public async getByUserId(userId: number): Promise<Quizz[]> {
        const rows = await executeQuery("SELECT * FROM quizz WHERE id_user = ?", [userId]);
        return rows.map((row: object) => new Quizz(row));
    }

    public async getByDepartementId(departementId: number): Promise<Quizz[]> {
        const rows = await executeQuery("SELECT * FROM quizz WHERE id_departement = ?", [departementId]);
        return rows.map((row: object) => new Quizz(row));
    }
}

export default QuizzRepository;