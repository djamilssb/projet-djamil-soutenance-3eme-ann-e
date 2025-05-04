import CharactersService from "@/app/api/services/CharactersService";
import CharactersRepository from "@/app/api/repositories/CharactersRepository";
import Characters from "@/app/api/models/Characters";

jest.mock("@/app/api/repositories/CharactersRepository");

describe("CharactersService", () => {
    let service: CharactersService;
    let repository: jest.Mocked<CharactersRepository>;

    beforeEach(() => {
        repository = new CharactersRepository() as jest.Mocked<CharactersRepository>;
        service = new CharactersService();
        (service as any).charactersRepository = repository;
        jest.clearAllMocks();
    });

    it("should retrieve all characters", async () => {
        const mockCharacters = [
            new Characters({ id: 1, id_quiz: 101, name: "Character 1", image_url: "url1", created_at: new Date("2023-01-01") }),
            new Characters({ id: 2, id_quiz: 102, name: "Character 2", image_url: "url2", created_at: new Date("2023-02-01") }),
        ];
        repository.getAll.mockResolvedValue(mockCharacters);

        const result = await service.getAll();

        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Characters);
        expect(result[0].getCreatedAt()).toEqual(new Date("2023-01-01"));
    });

    it("should retrieve a character by ID", async () => {
        const mockCharacter = new Characters({ id: 1, id_quiz: 101, name: "Character 1", image_url: "url1" });
        repository.getById.mockResolvedValue(mockCharacter);

        const result = await service.getById(1);

        expect(repository.getById).toHaveBeenCalledWith(1);
        expect(result).toBeInstanceOf(Characters);
    });

    it("should throw an error for invalid ID in getById", async () => {
        await expect(service.getById(NaN)).rejects.toThrow("Invalid character ID");
    });

    it("should create a character", async () => {
        repository.create.mockResolvedValue(true);

        const character = new Characters({ id_quiz: 101, name: "Character 1", image_url: "url1" });
        const result = await service.create(character);

        expect(repository.create).toHaveBeenCalledWith(character);
        expect(result).toBe(true);
    });

    it("should update a character", async () => {
        repository.update.mockResolvedValue(true);

        const result = await service.update(1, { name: "Updated Character" });

        expect(repository.update).toHaveBeenCalledWith(1, { name: "Updated Character" });
        expect(result).toBe(true);
    });

    it("should delete a character", async () => {
        repository.delete.mockResolvedValue(true);

        const result = await service.delete(1);

        expect(repository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});