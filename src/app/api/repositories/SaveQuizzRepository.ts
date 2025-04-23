import executeQuery from "@/utils/executeQuery";
import SaveQuizz from "../models/SaveQuizz";

class SaveQuizzRepository {

    constructor() {}

    public async getAll(): Promise<SaveQuizz[]> {
        const rows = await executeQuery("SELECT * FROM Save_quizz", []);
        return rows.map((row: object) => new SaveQuizz(row));
    }

    public async getById(id: number): Promise<SaveQuizz | null> {
        const row = await executeQuery("SELECT * FROM Save_quizz WHERE id = ?", [id]);
        if (row.length === 0) return null;
        return new SaveQuizz(row[0]);
    }

    public async create(saveQuizz: Partial<SaveQuizz>): Promise<boolean> {
        const newSaveQuizz = saveQuizz;
        const result = await executeQuery("INSERT INTO Save_quizz SET ?", [newSaveQuizz]);
        return result.affectedRows > 0;
    }

    public async update(id: number, id_user: number, id_quizz: number, saveQuizz: Partial<SaveQuizz>): Promise<boolean> {

        const saveQuizzId: number = id;
        const userId: number = id_user;
        const quizzId: number = id_quizz;
        const updatedSaveQuizz = saveQuizz;

        const result = await executeQuery("UPDATE Save_quizz SET ? WHERE id = ? AND id_user = ? AND id_quizz = ?", [
            updatedSaveQuizz,
            saveQuizzId,
            userId,
            quizzId,
        ]);
        return result.affectedRows > 0;
    }

    public async delete(id: number): Promise<boolean> {

        const deletedSaveId: number = id;
        const result = await executeQuery("DELETE FROM Save_quizz WHERE id = ?", [deletedSaveId]);
        return result.affectedRows > 0;
    }
}

export default SaveQuizzRepository;