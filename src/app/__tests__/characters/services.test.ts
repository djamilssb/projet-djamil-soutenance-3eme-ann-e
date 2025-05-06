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
      new Characters({
        id: 1,
        id_quiz: 101,
        name: "Character 1",
        image_url: "url1",
        created_at: new Date("2023-01-01"),
      }),
      new Characters({
        id: 2,
        id_quiz: 102,
        name: "Character 2",
        image_url: "url2",
        created_at: new Date("2023-02-01"),
      }),
    ];
    repository.getAll.mockResolvedValue(mockCharacters);

    const result = await service.getAll();

    expect(repository.getAll).toHaveBeenCalled();
    expect(result).toHaveLength(2);
    expect(result[0]).toBeInstanceOf(Characters);
    expect(result[0].getCreatedAt()).toEqual(new Date("2023-01-01"));
  });

  it("should throw an error when getAll fails", async () => {
    repository.getAll.mockRejectedValue(new Error("Database error"));

    await expect(service.getAll()).rejects.toThrow("Erreur lors de la récupération des personnages");
    expect(repository.getAll).toHaveBeenCalled();
  });

  it("should throw an error when getById fails", async () => {
    repository.getById.mockRejectedValue(new Error("Database error"));

    await expect(service.getById(1)).rejects.toThrow("Erreur lors de la récupération du personnage");
    expect(repository.getById).toHaveBeenCalledWith(1);
  });

  it("should throw an error when create fails", async () => {
    repository.create.mockRejectedValue(new Error("Database error"));

    const character = new Characters({ id_quiz: 101, name: "Character 1", image_url: "url1" });
    await expect(service.create(character)).rejects.toThrow("Erreur lors de la création du personnage");
    expect(repository.create).toHaveBeenCalledWith(character);
  });

  it("should throw an error when update fails", async () => {
    repository.update.mockRejectedValue(new Error("Database error"));

    await expect(service.update(1, { name: "Updated Character" })).rejects.toThrow("Erreur lors de la mise à jour du personnage");
    expect(repository.update).toHaveBeenCalledWith(1, { name: "Updated Character" });
  });

  it("should throw an error when delete fails", async () => {
    repository.delete.mockRejectedValue(new Error("Database error"));

    await expect(service.delete(1)).rejects.toThrow("Erreur lors de la suppression du personnage");
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});