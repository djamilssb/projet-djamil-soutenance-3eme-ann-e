import Question from "../models/Question";
import QuestionRepository from "../repositories/QuestionRepository";

class QuestionService {

    private questionRepository: QuestionRepository;

    constructor(repository?: QuestionRepository) {
        this.questionRepository = repository ?? new QuestionRepository();
    }

    public async getAll(): Promise<Question[]> {
        try {
            const rows = await this.questionRepository.getAll();
            if (!rows) throw new Error("Error while fetching questions");

            return rows;
        } catch(e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des questions");
        }
    }

    public async getById(id: number): Promise<Question | null> {
        try {
            const question = await this.questionRepository.getById(id);
            if (!question) throw new Error("Question non trouvé");

            return question;
        } catch(e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération de la question avec ID ${id}`);
        }
    }

    public async create(question: Partial<Question>): Promise<boolean> {
        try {

            if (!question.idQuizz || !question.orderIndex || !question.content?.trim()) throw new Error("Données de la question incomplètes");

            const createdResult = await this.questionRepository.create(question);

            if (!createdResult) throw new Error("Erreur lors de la création de la question");

            return createdResult;
        } catch(e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création de la question");
        }
    }

    public async update(id: number, question: Partial<Question>): Promise<boolean> {
        try {

            if (!id || isNaN(id)) {
                throw new Error("ID question invalide");
            }

            const updatedResult = await this.questionRepository.update(id, question);
            
            if (!updatedResult) throw new Error("Erreur lors de la mise à jour de la question");

            return updatedResult;
        } catch(e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour de la question");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {

            if (!id || isNaN(id)) {
                throw new Error("ID question invalide");
            }

            const deletedResult = await this.questionRepository.delete(id);

            if (!deletedResult) throw new Error("Erreur lors de la suppression de la question");

            return deletedResult;
        } catch(e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression de la question");
        }
    }

    public async getQuestionsByQuizz(idQuizz: number): Promise<Question[]> {
        try {
            const rows = await this.questionRepository.getQuestionsByQuizz(idQuizz);
            if (rows.length === 0) return [];
            return rows;
        } catch(e) {
            console.error("Error in getQuestionsByQuizz:", e);
            throw new Error(`Erreur lors de la récupération des questions de questionnaire avec ID ${idQuizz}`);
        }
    }
}

export default QuestionService;