import Quizz from "../models/Quizz";
import Users from "../models/Users";
import QuizzRepository from "../repositories/QuizzRepository";

class QuizzService {
    private quizzRepository: QuizzRepository;

    constructor() {
        this.quizzRepository = new QuizzRepository();
    }

    public async getAll(): Promise<Quizz[]> {
        try {
            const rows = await this.quizzRepository.getAll();
            if (rows.length === 0) return [];

            return rows;
        } catch(e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des quizz");
        }
    }

    public async getById(id: number): Promise<Quizz | null> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID quizz invalide");
            }
            
            const quizz = await this.quizzRepository.getById(id);
            if (!quizz) throw new Error("Quizz non trouvé");

            return quizz;
        } catch(e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération du quizz avec ID ${id}`);
        }
    }

    public async create(quizz: Partial<Quizz>): Promise<boolean> {
        console.log('quiz', quizz);
        try {
            if (!quizz.title?.trim() || !quizz.id_user) {
                throw new Error("Données du quizz incomplètes");
            }

            const created = await this.quizzRepository.create(quizz);

            if (!created) throw new Error("Erreur lors de la création du quizz");

            return created;
        } catch(e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création du quizz");
        }
    }

    public async update(id: number, quizz: Partial<Quizz>): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID quizz invalide");
            }

            const updated = await this.quizzRepository.update(id, quizz);
            
            if (!updated) throw new Error("Erreur lors de la mise à jour du quizz");

            return updated;
        } catch(e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour du quizz");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID quizz invalide");
            }

            const deleted = await this.quizzRepository.delete(id);

            if (!deleted) throw new Error("Erreur lors de la suppression du quizz");

            return deleted;
        } catch(e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression du quizz");
        }
    }

    public async getByUserId(userId: number): Promise<Quizz[]> {
        try {
            if (!userId || isNaN(userId)) {
                throw new Error("ID utilisateur invalide");
            }

            const quizzes = await this.quizzRepository.getByUserId(userId);
            
            return quizzes;
        } catch(e) {
            console.error("Error in getByUserId:", e);
            throw new Error(`Erreur lors de la récupération des quizz pour l'utilisateur ${userId}`);
        }
    }

    public async getByDepartementId(departementId: number): Promise<Quizz[]> {
        try {
            if (!departementId || isNaN(departementId)) {
                throw new Error("ID département invalide");
            }

            const quizzes = await this.quizzRepository.getByDepartementId(departementId);
            
            return quizzes;
        } catch(e) {
            console.error("Error in getByDepartementId:", e);
            throw new Error(`Erreur lors de la récupération des quizz pour le département ${departementId}`);
        }
    }

    public async getAllQuizByIdUser(userId: number): Promise<Quizz[]> {
    try {
        return await this.quizzRepository.getAllQuizByIdUser(userId);
    } catch(e) {
        console.error("Error in getAllQuizByIdUser:", e);
        throw new Error(`Erreur lors de la récupération des quizz pour l'utilisateur ${userId}`);
    }
}

public async getQuizzesWhereIdUserIsNull(): Promise<Quizz|Quizz[]|undefined> {
    try {
        return await this.quizzRepository.getQuizzesWhereIdUserIsNull();
    } catch (error) {
        console.error('Error in getQuizzesWhereIdUserIsNull:', error);
        throw new Error('Failed to retrieve official quizzes');
    }
}
}

export default QuizzService;