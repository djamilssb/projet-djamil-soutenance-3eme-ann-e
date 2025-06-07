import Answer from "../models/Answer";
import executeQuery from "@/utils/executeQuery";

class AnswerRepository {
    constructor() {}

    public async getAll(): Promise<Answer[]> {
        const rows = await executeQuery("SELECT * FROM kt_answers", []);
        return rows.map((row: object) => new Answer(row));
    }

    public async getById(id: number): Promise<Answer | null> {
        const row = await executeQuery("SELECT * FROM kt_answers WHERE id = ?", [id]);
        if (row.length === 0) return null;
        return new Answer(row[0]);
    }

    public async create(answer: Partial<Answer>): Promise<boolean> {
        const newAnswer = answer;
        const result = await executeQuery("INSERT INTO kt_answers SET ?", [newAnswer]);
        return result.affectedRows > 0;
    }

    public async update(id: number, answer: Partial<Answer>): Promise<boolean> {
        const answerId = id;
        const updatedAnswer = answer;
        const result = await executeQuery("UPDATE kt_answers SET ? WHERE id = ?", [
            updatedAnswer,
            answerId,
        ]);
        return result.affectedRows > 0;
    }

    public async delete(id: number): Promise<boolean> {
        const result = await executeQuery("DELETE FROM kt_answers WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }

    public async getAnswersByQuizz(idQuizz: number): Promise<Answer[]> {
        const rows = await executeQuery("SELECT * FROM kt_answers WHERE id_quizz = ?", [idQuizz]);
        return rows.map((row: object) => new Answer(row));
    }

    // Méthode qui récupère les réponses par ID de question
    public async getByQuestionId(questionId: number): Promise<Answer[]> {
        // Vérifier que cette requête filtre correctement par id_question
        const rows = await executeQuery(
            "SELECT * FROM kt_answers WHERE id_question = ?", 
            [questionId]
        );
        
        return rows.map((row: object) => new Answer(row));
    }
}

export default AnswerRepository;