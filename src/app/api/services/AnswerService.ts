import Answer from "../models/Answer";
import AnswerRepository from "../repositories/AnswerRepository";

class AnswerService {

    private answerRepository: AnswerRepository;

    constructor(repository?: AnswerRepository) {
        this.answerRepository = repository ?? new AnswerRepository();
    }

    public async getAll(): Promise<Answer[]> {
        try {
            const rows = await this.answerRepository.getAll();
            if (!rows) throw new Error("Error while fetching answers");

            return rows;
        } catch(e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des réponses");
        }
    }

    public async getById(id: number): Promise<Answer | null> {
        try {
            const answer = await this.answerRepository.getById(id);
            if (!answer) throw new Error("Réponse non trouvé");

            return answer;
        } catch(e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération de la réponse avec ID ${id}`);
        }
    }

    public async create(answer: Partial<Answer>): Promise<boolean> {
        try {

            if (!answer.idQuizz || !answer.idQuestion || !answer.explication || !answer.orderIndex || !answer.content?.trim()) throw new Error("Données de la réponse incomplètes");

            const createdResult = await this.answerRepository.create(answer);

            if (!createdResult) throw new Error("Erreur lors de la création de la réponse");

            return createdResult;
        } catch(e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création de la réponse");
        }
    }

    public async update(id: number, answer: Partial<Answer>): Promise<boolean> {
        try {

            if (!id || isNaN(id)) {
                throw new Error("ID réponse invalide");
            }

            const updatedResult = await this.answerRepository.update(id, answer);
            
            if (!updatedResult) throw new Error("Erreur lors de la mise à jour de la réponse");

            return updatedResult;
        } catch(e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour de la réponse");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {

            if (!id || isNaN(id)) {
                throw new Error("ID réponse invalide");
            }

            const deletedResult = await this.answerRepository.delete(id);

            if (!deletedResult) throw new Error("Erreur lors de la suppression de la réponse");

            return deletedResult;
        } catch(e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression de la réponse");
        }
    }

    public async getAnswersByQuizz(idQuizz: number): Promise<Answer[]> {
        try {
            const rows = await this.answerRepository.getAnswersByQuizz(idQuizz);
            if (!rows) throw new Error("Error while fetching answers");

            return rows;
        } catch(e) {
            console.error("Error in getAnswersByQuizz:", e);
            throw new Error(`Erreur lors de la récupération des réponses de questionnaire avec ID ${idQuizz}`);
        }
    }

    public async getAnswersByQuestion(idQuestion: number): Promise<Answer[]> {
        try {
            const rows = await this.answerRepository.getByQuestionId(idQuestion);
            if (!rows) throw new Error("Error while fetching answers");

            return rows;
        } catch(e) {
            console.error("Error in getAnswersByQuestion:", e);
            throw new Error(`Erreur lors de la récupération des réponses de question avec ID ${idQuestion}`);
        }
    }
}

export default AnswerService;