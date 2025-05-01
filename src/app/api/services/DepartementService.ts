import Departement from "../models/Departement";
import DepartementRepository from "../repositories/DepartementRepository";

class DepartementService {
    private departementRepository: DepartementRepository;

    constructor() {
        this.departementRepository = new DepartementRepository();
    }

    public async getAll(): Promise<Departement[]> {
        try {
            const rows = await this.departementRepository.getAll();
            if (rows.length === 0) return [];

            return rows;
        } catch(e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des départements");
        }
    }

    public async getById(id: number): Promise<Departement | null> {
        try {
            const departement = await this.departementRepository.getById(id);
            if (!departement) throw new Error("Département non trouvé");

            return departement;
        } catch(e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération du département avec ID ${id}`);
        }
    }

    public async getByDepartementNumber(departementNumber: string): Promise<Departement | null> {
        try {
            const departement = await this.departementRepository.getByDepartementNumber(departementNumber);
            if (!departement) throw new Error("Département non trouvé");

            return departement;
        } catch(e) {
            console.error("Error in getByDepartementNumber:", e);
            throw new Error(`Erreur lors de la récupération du département avec numéro ${departementNumber}`);
        }
    }

    public async create(departement: Partial<Departement>): Promise<boolean> {
        try {
            if (!departement.name?.trim() || !departement.departement_number?.trim()) {
                throw new Error("Données du département incomplètes");
            }

            const created = await this.departementRepository.create(departement);

            if (!created) throw new Error("Erreur lors de la création du département");

            return created;
        } catch(e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création du département");
        }
    }

    public async update(id: number, departement: Partial<Departement>): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID département invalide");
            }

            const updated = await this.departementRepository.update(id, departement);
            
            if (!updated) throw new Error("Erreur lors de la mise à jour du département");

            return updated;
        } catch(e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour du département");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID département invalide");
            }

            const deleted = await this.departementRepository.delete(id);

            if (!deleted) throw new Error("Erreur lors de la suppression du département");

            return deleted;
        } catch(e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression du département");
        }
    }
}

export default DepartementService;