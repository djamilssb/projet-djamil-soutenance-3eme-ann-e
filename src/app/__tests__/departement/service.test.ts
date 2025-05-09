import DepartementService from "@/app/api/services/DepartementService";
import DepartementRepository from "@/app/api/repositories/DepartementRepository";
import Departement from "@/app/api/models/Departement";

jest.mock("@/app/api/repositories/DepartementRepository");

describe("DepartementService", () => {
    let service: DepartementService;
    let repository: jest.Mocked<DepartementRepository>;

    beforeEach(() => {
        // Spy sur console.error pour éviter les logs pendant les tests
        jest.spyOn(console, "error").mockImplementation(() => {});
        
        repository = new DepartementRepository() as jest.Mocked<DepartementRepository>;
        service = new DepartementService();
        (service as any).departementRepository = repository;
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should retrieve all departements", async () => {
        const mockDepartements = [
            new Departement({ id: 1, name: "Paris", departement_number: "75" }),
            new Departement({ id: 2, name: "Rhône", departement_number: "69" }),
        ];
        repository.getAll.mockResolvedValue(mockDepartements);

        const result = await service.getAll();

        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Departement);
        expect(result[0].name).toBe("Paris");
    });

    it("should return empty array when no departements exist", async () => {
        repository.getAll.mockResolvedValue([]);

        const result = await service.getAll();

        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toEqual([]);
    });

    it("should throw an error when getAll fails", async () => {
        repository.getAll.mockRejectedValue(new Error("Database error"));

        await expect(service.getAll()).rejects.toThrow("Erreur lors de la récupération des départements");
        expect(repository.getAll).toHaveBeenCalled();
    });

    it("should retrieve a departement by ID", async () => {
        const mockDepartement = new Departement({ id: 1, name: "Paris", departement_number: "75" });
        repository.getById.mockResolvedValue(mockDepartement);

        const result = await service.getById(1);

        expect(repository.getById).toHaveBeenCalledWith(1);
        expect(result).toBeInstanceOf(Departement);
        expect(result?.name).toBe("Paris");
    });

    it("should throw an error when departement is not found by ID", async () => {
        repository.getById.mockResolvedValue(null);

        await expect(service.getById(999)).rejects.toThrow("Erreur lors de la récupération du département avec ID 999");
        expect(repository.getById).toHaveBeenCalledWith(999);
    });

    it("should throw an error when getById fails", async () => {
        repository.getById.mockRejectedValue(new Error("Database error"));

        await expect(service.getById(1)).rejects.toThrow("Erreur lors de la récupération du département avec ID 1");
        expect(repository.getById).toHaveBeenCalledWith(1);
    });

    it("should retrieve a departement by departement number", async () => {
        const mockDepartement = new Departement({ id: 1, name: "Paris", departement_number: "75" });
        repository.getByDepartementNumber.mockResolvedValue(mockDepartement);

        const result = await service.getByDepartementNumber("75");

        expect(repository.getByDepartementNumber).toHaveBeenCalledWith("75");
        expect(result).toBeInstanceOf(Departement);
        expect(result?.name).toBe("Paris");
        expect(result?.departement_number).toBe("75");
    });

    it("should throw an error when departement is not found by number", async () => {
        repository.getByDepartementNumber.mockResolvedValue(null);

        await expect(service.getByDepartementNumber("999")).rejects.toThrow("Erreur lors de la récupération du département avec numéro 999");
        expect(repository.getByDepartementNumber).toHaveBeenCalledWith("999");
    });

    it("should throw an error when getByDepartementNumber fails", async () => {
        repository.getByDepartementNumber.mockRejectedValue(new Error("Database error"));

        await expect(service.getByDepartementNumber("75")).rejects.toThrow("Erreur lors de la récupération du département avec numéro 75");
        expect(repository.getByDepartementNumber).toHaveBeenCalledWith("75");
    });

    it("should create a departement", async () => {
        repository.create.mockResolvedValue(true);

        const departement = { name: "Paris", departement_number: "75" };
        const result = await service.create(departement);

        expect(repository.create).toHaveBeenCalledWith(departement);
        expect(result).toBe(true);
    });

    it("should throw an error when creating with invalid data", async () => {
        const invalidDepartement = { name: "", departement_number: "75" };

        await expect(service.create(invalidDepartement)).rejects.toThrow("Erreur lors de la création du département");
        expect(repository.create).not.toHaveBeenCalled();
    });

    it("should throw an error when repository create returns false", async () => {
        repository.create.mockResolvedValue(false);

        const departement = { name: "Paris", departement_number: "75" };
        await expect(service.create(departement)).rejects.toThrow("Erreur lors de la création du département");
        expect(repository.create).toHaveBeenCalledWith(departement);
    });

    it("should update a departement", async () => {
        repository.update.mockResolvedValue(true);

        const departement = { name: "Paris (Mise à jour)" };
        const result = await service.update(1, departement);

        expect(repository.update).toHaveBeenCalledWith(1, departement);
        expect(result).toBe(true);
    });

    it("should throw an error when updating with invalid ID", async () => {
        const departement = { name: "Paris" };

        await expect(service.update(NaN, departement)).rejects.toThrow("Erreur lors de la mise à jour du département");
        expect(repository.update).not.toHaveBeenCalled();
    });

    it("should throw an error when repository update returns false", async () => {
        repository.update.mockResolvedValue(false);

        const departement = { name: "Paris" };
        await expect(service.update(1, departement)).rejects.toThrow("Erreur lors de la mise à jour du département");
        expect(repository.update).toHaveBeenCalledWith(1, departement);
    });

    it("should delete a departement", async () => {
        repository.delete.mockResolvedValue(true);

        const result = await service.delete(1);

        expect(repository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it("should throw an error when deleting with invalid ID", async () => {
        await expect(service.delete(NaN)).rejects.toThrow("Erreur lors de la suppression du département");
        expect(repository.delete).not.toHaveBeenCalled();
    });

    it("should throw an error when repository delete returns false", async () => {
        repository.delete.mockResolvedValue(false);

        await expect(service.delete(1)).rejects.toThrow("Erreur lors de la suppression du département");
        expect(repository.delete).toHaveBeenCalledWith(1);
    });
});