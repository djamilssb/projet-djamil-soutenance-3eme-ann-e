import CharactersRepository from "@/app/api/repositories/CharactersRepository";
import Characters from "@/app/api/models/Characters";
import executeQuery from "@/utils/executeQuery";

jest.mock("@/utils/executeQuery");

describe("CharactersRepository", () => {
    let charactersRepository: CharactersRepository;

    beforeEach(() => {
        charactersRepository = new CharactersRepository();
        jest.clearAllMocks();
    });

    it("should retrieve all characters", async () => {
        const mockData = [
            { id: 1, id_quiz: 1, name: "Character 1", image_url: "url1", created_at: "2023-01-01" },
            { id: 2, id_quiz: 2, name: "Character 2", image_url: "url2", created_at: "2023-02-01" },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const characters = await charactersRepository.getAll();

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_characters", []);
        expect(characters).toHaveLength(2);
        expect(characters[0]).toBeInstanceOf(Characters);
        expect(characters[0].getName()).toBe("Character 1");
    });

    it("should retrieve a character by ID", async () => {
        const mockData = [{ id: 1, id_quiz: 1, name: "Character 1", image_url: "url1", created_at: "2023-01-01" }];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const character = await charactersRepository.getById(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_characters WHERE id = ?", [1]);
        expect(character).toBeInstanceOf(Characters);
        expect(character?.getName()).toBe("Character 1");
    });

    it("should return null if character is not found", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const character = await charactersRepository.getById(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_characters WHERE id = ?", [999]);
        expect(character).toBeNull();
    });

    it("should create a character", async () => {
        const mockCharacter = new Characters({
            id_quiz: 1,
            name: "Character 1",
            image_url: "url1",
            created_at: new Date("2023-01-01"),
        });

        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await charactersRepository.create(mockCharacter);

        expect(executeQuery).toHaveBeenCalledWith("INSERT INTO kt_characters SET ?", [
            {
                id_quiz: 1,
                name: "Character 1",
                image_url: "url1",
                created_at: new Date("2023-01-01"),
            },
        ]);
        expect(result).toBe(true);
    });

    it("should update a character", async () => {
        const mockCharacter = new Characters({
            id: 1,
            id_quiz: 1,
            name: "Updated Character",
            image_url: "updated_url",
        });

        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await charactersRepository.update(mockCharacter.getId()!, mockCharacter);

        expect(executeQuery).toHaveBeenCalledWith("UPDATE kt_characters SET ? WHERE id = ?", [mockCharacter, 1]);
        expect(result).toBe(true);
    });

    it("should delete a character", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await charactersRepository.delete(1);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM kt_characters WHERE id = ?", [1]);
        expect(result).toBe(true);
    });
});