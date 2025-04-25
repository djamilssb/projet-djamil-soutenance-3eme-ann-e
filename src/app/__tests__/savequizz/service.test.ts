import SaveQuizzService from "@/app/api/services/SaveQuizzService";
import SaveQuizzRepository from "@/app/api/repositories/SaveQuizzRepository";
import SaveQuizz from "@/app/api/models/SaveQuizz";

jest.mock("@/app/api/repositories/SaveQuizzRepository");

describe("SaveQuizzService", () => {
    let service: SaveQuizzService;
    let repository: jest.Mocked<SaveQuizzRepository>;

    beforeEach(() => {
        repository = new SaveQuizzRepository() as jest.Mocked<SaveQuizzRepository>;
        service = new SaveQuizzService();
        (service as any).saveQuizzRepository = repository;
        jest.clearAllMocks();
    });

    it("should retrieve all quiz saves", async () => {
        const mockQuizSaves = [
            new SaveQuizz({ id: 1, id_user: 1, id_quizz: 1, id_character: 1 }),
            new SaveQuizz({ id: 2, id_user: 2, id_quizz: 2, id_character: 2 }),
        ];
        repository.getAll.mockResolvedValue(mockQuizSaves);

        const result = await service.getAll();

        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(SaveQuizz);
    });

    it("should retrieve a quiz save by ID", async () => {
        const mockQuizSave = new SaveQuizz({ id: 1, id_user: 1, id_quizz: 1, id_character: 1 });
        repository.getById.mockResolvedValue(mockQuizSave);

        const result = await service.getById(1);

        expect(repository.getById).toHaveBeenCalledWith(1);
        expect(result).toBeInstanceOf(SaveQuizz);
    });

    it("should throw an error for invalid ID in getById", async () => {
        await expect(service.getById(NaN)).rejects.toThrow("Invalid quiz save ID");
    });

    it("should create a quiz save", async () => {
        repository.create.mockResolvedValue(true);

        const saveQuizz = new SaveQuizz({ id_user: 1, id_quizz: 1, id_character: 1 });
        const result = await service.create(saveQuizz);

        expect(repository.create).toHaveBeenCalledWith(saveQuizz);
        expect(result).toBe(true);
    });

    it("should update a quiz save", async () => {
        repository.update.mockResolvedValue(true);

        const result = await service.update(1, 1, 1, { score: 100 });

        expect(repository.update).toHaveBeenCalledWith(1, 1, 1, { score: 100 });
        expect(result).toBe(true);
    });

    it("should delete a quiz save", async () => {
        repository.delete.mockResolvedValue(true);

        const result = await service.delete(1);

        expect(repository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});