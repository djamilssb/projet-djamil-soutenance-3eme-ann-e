import kt_organizations from "../models/Organizations";
import kt_OrganizationRepository from "../repositories/OrganizationsRepository";

class kt_organizationsService {
    private kt_OrganizationRepository: kt_OrganizationRepository;

    constructor() {
        this.kt_OrganizationRepository = new kt_OrganizationRepository();
    }

    public async getAll(): Promise<kt_organizations[]> {
        try {
            const rows = await this.kt_OrganizationRepository.getAll();
            if (!rows) throw new Error("Error while fetching organizations");

            return rows;
        } catch (e) {
            console.error("Error in getAll:", e);
            throw new Error("Erreur lors de la récupération des organizations");
        }
    }

    public async getById(id: number): Promise<kt_organizations | null> {
        try {
            const organization = await this.kt_OrganizationRepository.getById(id);
            if (!organization) throw new Error("Organization not found");

            return organization;
        } catch (e) {
            console.error("Error in getById:", e);
            throw new Error(`Erreur lors de la récupération de l'organization avec ID ${id}`);
        }
    }

    public async create(organization: Partial<kt_organizations>): Promise<boolean> {
        try {
            if (
                !organization.name?.trim() ||
                !organization.email?.trim() ||
                !organization.phone_number?.trim() ||
                !organization.about_us?.trim()
            ) {
                throw new Error("Incomplete organization data");
            }

            const created = await this.kt_OrganizationRepository.create(organization);

            if (!created) throw new Error("Error while creating the organization");

            return created;
        } catch (e) {
            console.error("Error in create:", e);
            throw new Error("Erreur lors de la création de l'organization");
        }
    }

    public async update(id: number, organization: Partial<kt_organizations>): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("Invalid organization ID");
            }

            const updated = await this.kt_OrganizationRepository.update(id, organization);

            if (!updated) throw new Error("Error while updating the organization");

            return updated;
        } catch (e) {
            console.error("Error in update:", e);
            throw new Error("Erreur lors de la mise à jour de l'organization");
        }
    }

    public async delete(id: number): Promise<boolean> {
        try {
            if (!id || isNaN(id)) {
                throw new Error("Invalid organization ID");
            }

            const deleted = await this.kt_OrganizationRepository.delete(id);

            if (!deleted) throw new Error("Error while deleting the organization");

            return deleted;
        } catch (e) {
            console.error("Error in delete:", e);
            throw new Error("Erreur lors de la suppression de l'organization");
        }
    }
}

export default kt_organizationsService;
