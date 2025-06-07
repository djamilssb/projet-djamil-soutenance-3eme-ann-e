import QuizzService from "@/app/api/services/QuizzService";
import QuizzRepository from "@/app/api/repositories/QuizzRepository";
import Quizz from "@/app/api/models/Quizz";

jest.mock("@/app/api/repositories/QuizzRepository");

describe("QuizzService", () => {
    let service: QuizzService;
    let repository: jest.Mocked<QuizzRepository>;

    beforeEach(() => {
        // Spy sur console.error pour éviter les logs pendant les tests
        jest.spyOn(console, "error").mockImplementation(() => {});
        
        repository = new QuizzRepository() as jest.Mocked<QuizzRepository>;
        service = new QuizzService();
        (service as any).quizzRepository = repository;
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("should retrieve all quizzes", async () => {
        const mockQuizzes = [
            new Quizz({ id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 }),
            new Quizz({ id: 2, id_user: 1, title: "Quiz 2", id_departement: 2 }),
        ];
        repository.getAll.mockResolvedValue(mockQuizzes);

        const result = await service.getAll();

        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Quizz);
        expect(result[0].title).toBe("Quiz 1");
    });

    it("should return empty array when no quizzes exist", async () => {
        repository.getAll.mockResolvedValue([]);

        const result = await service.getAll();

        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toEqual([]);
    });

    it("should throw an error when getAll fails", async () => {
        repository.getAll.mockRejectedValue(new Error("Database error"));

        await expect(service.getAll()).rejects.toThrow("Erreur lors de la récupération des quizz");
        expect(repository.getAll).toHaveBeenCalled();
    });

    it("should retrieve a quizz by ID", async () => {
        const mockQuizz = new Quizz({ id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 });
        repository.getById.mockResolvedValue(mockQuizz);

        const result = await service.getById(1);

        expect(repository.getById).toHaveBeenCalledWith(1);
        expect(result).toBeInstanceOf(Quizz);
        expect(result?.title).toBe("Quiz 1");
    });

    it("should throw an error for invalid ID in getById", async () => {
        await expect(service.getById(NaN)).rejects.toThrow("Erreur lors de la récupération du quizz avec ID NaN");
        expect(repository.getById).not.toHaveBeenCalled();
    });

    it("should throw an error when quizz is not found by ID", async () => {
        repository.getById.mockResolvedValue(null);

        await expect(service.getById(999)).rejects.toThrow("Erreur lors de la récupération du quizz avec ID 999");
        expect(repository.getById).toHaveBeenCalledWith(999);
    });

    it("should throw an error when getById repository fails", async () => {
        repository.getById.mockRejectedValue(new Error("Database error"));

        await expect(service.getById(1)).rejects.toThrow("Erreur lors de la récupération du quizz avec ID 1");
        expect(repository.getById).toHaveBeenCalledWith(1);
    });

    it("should create a quizz with valid data", async () => {
        repository.create.mockResolvedValue(true);

        const quizz = { id_user: 1, title: "New Quiz", id_departement: 1 };
        const result = await service.create(quizz);

        expect(repository.create).toHaveBeenCalledWith(quizz);
        expect(result).toBe(true);
    });

    it("should throw an error when creating with missing title", async () => {
        const quizz = { id_user: 1, title: "" };

        await expect(service.create(quizz)).rejects.toThrow("Erreur lors de la création du quizz");
        expect(repository.create).not.toHaveBeenCalled();
    });

    it("should throw an error when creating with missing id_user", async () => {
        const quizz = { title: "Quiz without user" };

        await expect(service.create(quizz)).rejects.toThrow("Erreur lors de la création du quizz");
        expect(repository.create).not.toHaveBeenCalled();
    });

    it("should throw an error when create repository returns false", async () => {
        repository.create.mockResolvedValue(false);

        const quizz = { id_user: 1, title: "Failed Quiz" };
        await expect(service.create(quizz)).rejects.toThrow("Erreur lors de la création du quizz");
        expect(repository.create).toHaveBeenCalledWith(quizz);
    });

    it("should update a quizz with valid data", async () => {
        repository.update.mockResolvedValue(true);

        const updates = { title: "Updated Quiz" };
        const result = await service.update(1, updates);

        expect(repository.update).toHaveBeenCalledWith(1, updates);
        expect(result).toBe(true);
    });

    it("should throw an error when updating with invalid ID", async () => {
        const updates = { title: "Invalid ID Quiz" };

        await expect(service.update(NaN, updates)).rejects.toThrow("Erreur lors de la mise à jour du quizz");
        expect(repository.update).not.toHaveBeenCalled();
    });

    it("should throw an error when update repository returns false", async () => {
        repository.update.mockResolvedValue(false);

        const updates = { title: "Failed Update" };
        await expect(service.update(1, updates)).rejects.toThrow("Erreur lors de la mise à jour du quizz");
        expect(repository.update).toHaveBeenCalledWith(1, updates);
    });

    it("should delete a quizz with valid ID", async () => {
        repository.delete.mockResolvedValue(true);

        const result = await service.delete(1);

        expect(repository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it("should throw an error when deleting with invalid ID", async () => {
        await expect(service.delete(NaN)).rejects.toThrow("Erreur lors de la suppression du quizz");
        expect(repository.delete).not.toHaveBeenCalled();
    });

    it("should throw an error when delete repository returns false", async () => {
        repository.delete.mockResolvedValue(false);

        await expect(service.delete(1)).rejects.toThrow("Erreur lors de la suppression du quizz");
        expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it("should retrieve quizzes by user ID", async () => {
        const mockQuizzes = [
            new Quizz({ id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 }),
            new Quizz({ id: 2, id_user: 1, title: "Quiz 2", id_departement: 2 }),
        ];
        repository.getByUserId.mockResolvedValue(mockQuizzes);

        const result = await service.getByUserId(1);

        expect(repository.getByUserId).toHaveBeenCalledWith(1);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Quizz);
        expect(result[0].id_user).toBe(1);
    });

    it("should throw an error for invalid user ID", async () => {
        await expect(service.getByUserId(NaN)).rejects.toThrow("Erreur lors de la récupération des quizz pour l'utilisateur NaN");
        expect(repository.getByUserId).not.toHaveBeenCalled();
    });

    it("should return empty array when no quizzes for user", async () => {
        repository.getByUserId.mockResolvedValue([]);

        const result = await service.getByUserId(1);

        expect(repository.getByUserId).toHaveBeenCalledWith(1);
        expect(result).toEqual([]);
    });

    it("should throw an error when getByUserId repository fails", async () => {
        repository.getByUserId.mockRejectedValue(new Error("Database error"));

        await expect(service.getByUserId(1)).rejects.toThrow("Erreur lors de la récupération des quizz pour l'utilisateur 1");
        expect(repository.getByUserId).toHaveBeenCalledWith(1);
    });

    it("should retrieve quizzes by departement ID", async () => {
        const mockQuizzes = [
            new Quizz({ id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 }),
            new Quizz({ id: 3, id_user: 2, title: "Quiz 3", id_departement: 1 }),
        ];
        repository.getByDepartementId.mockResolvedValue(mockQuizzes);

        const result = await service.getByDepartementId(1);

        expect(repository.getByDepartementId).toHaveBeenCalledWith(1);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Quizz);
        expect(result[0].id_departement).toBe(1);
    });

    it("should throw an error for invalid departement ID", async () => {
        await expect(service.getByDepartementId(NaN)).rejects.toThrow("Erreur lors de la récupération des quizz pour le département NaN");
        expect(repository.getByDepartementId).not.toHaveBeenCalled();
    });

    it("should return empty array when no quizzes for departement", async () => {
        repository.getByDepartementId.mockResolvedValue([]);

        const result = await service.getByDepartementId(1);

        expect(repository.getByDepartementId).toHaveBeenCalledWith(1);
        expect(result).toEqual([]);
    });

    it("should throw an error when getByDepartementId repository fails", async () => {
        repository.getByDepartementId.mockRejectedValue(new Error("Database error"));

        await expect(service.getByDepartementId(1)).rejects.toThrow("Erreur lors de la récupération des quizz pour le département 1");
        expect(repository.getByDepartementId).toHaveBeenCalledWith(1);
    });
});