import CharactersController from "@/app/api/controllers/CharactersController";
import CharactersService from "@/app/api/services/CharactersService";
import Characters from "@/app/api/models/Characters";
import { NextRequest } from "next/server";

jest.mock("@/app/api/services/CharactersService");

describe("CharactersController", () => {
    let controller: CharactersController;
    let service: jest.Mocked<CharactersService>;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
        service = new CharactersService() as jest.Mocked<CharactersService>;
        controller = new CharactersController();
        controller["charactersService"] = service;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // GET ALL
    describe("getAllCharacters", () => {
        it("should return status 200 and a list of characters", async () => {
            const mockCharacters = [
                new Characters({ id: 1, id_quiz: 101, name: "Character 1", image_url: "url1", created_at: new Date("2023-01-01T00:00:00.000Z") }),
                new Characters({ id: 2, id_quiz: 102, name: "Character 2", image_url: "url2", created_at: new Date("2023-02-01T00:00:00.000Z") }),
            ];
            service.getAll.mockResolvedValue(mockCharacters); // Utilise des instances de Characters

            const req = {} as NextRequest;
            const response = await controller.getAllCharacters(req);

            expect(service.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockCharacters.map(character => ({
                id: character.id,
                id_quiz: character.id_quiz,
                name: character.name,
                image_url: character.image_url,
                created_at: character.created_at?.toISOString() ?? null,
            }))); // Compare plain objects
        });

        it("should return status 500 if service fails", async () => {
            service.getAll.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await controller.getAllCharacters(req);

            expect(service.getAll).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to retrieve characters." });
        });
    });

    it("should return status 404 if character is not found", async () => {
        service.getById.mockResolvedValue(null);

        const req = {} as NextRequest;
        const response = await controller.getCharacterById(req, 999);

        expect(service.getById).toHaveBeenCalledWith(999);
        expect(response.status).toBe(404);
        expect(await response.json()).toEqual({ message: "Character not found." });
    });

    it("should return status 500 if service fails", async () => {
        service.getById.mockRejectedValue(new Error("Service error"));

        const req = {} as NextRequest;
        const response = await controller.getCharacterById(req, 1);

        expect(service.getById).toHaveBeenCalledWith(1);
        expect(response.status).toBe(500);
        expect(await response.json()).toEqual({ message: "Failed to retrieve the character." });
    });

    // CREATE
    describe("createCharacter", () => {
        it("should return status 201 if character is created", async () => {
            service.create.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = new Characters({ id_quiz: 101, name: "Character 1", image_url: "url1", created_at: new Date("2023-01-01") });
            const response = await controller.createCharacter(req, body);

            expect(service.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(201);
            expect(await response.json()).toEqual({ message: "Character successfully created." });
        });

        it("should return status 400 for invalid data", async () => {
            const req = {} as NextRequest;
            const body = { name: "" };
            const response = await controller.createCharacter(req, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Missing character data." });
        });

        it("should return status 400 for missing character data", async () => {
            const req = {} as NextRequest;
            const body = {};
            const response = await controller.createCharacter(req, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Missing character data." });
        });

        it("should return status 500 if service fails", async () => {
            service.create.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = new Characters({ id_quiz: 101, name: "Character 1", image_url: "url1", created_at: new Date("2023-01-01") });
            const response = await controller.createCharacter(req, body);

            expect(service.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to create the character." });
        });
    });

    // UPDATE
    describe("updateCharacter", () => {
        it("should return status 200 if character is updated", async () => {
            service.update.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = { name: "Updated Character", created_at: new Date("2023-02-01") };
            const response = await controller.updateCharacter(req, 1, body);

            expect(service.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Character successfully updated." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const body = { name: "Updated Character" };
            const response = await controller.updateCharacter(req, NaN, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid character ID." });
        });

        it("should return status 400 for missing update data", async () => {
            const req = {} as NextRequest;
            const body = {};
            const response = await controller.updateCharacter(req, 1, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Missing update data." });
        });

        it("should return status 500 if service fails", async () => {
            service.update.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = { name: "Updated Character" };
            const response = await controller.updateCharacter(req, 1, body);

            expect(service.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to update the character." });
        });
    });

    // DELETE
    describe("deleteCharacter", () => {
        it("should return status 200 if character is deleted", async () => {
            service.delete.mockResolvedValue(true);

            const req = {} as NextRequest;
            const response = await controller.deleteCharacter(req, 1);

            expect(service.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Character successfully deleted." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const response = await controller.deleteCharacter(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid character ID." });
        });

        it("should return status 500 if service fails", async () => {
            service.delete.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await controller.deleteCharacter(req, 1);

            expect(service.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to delete the character." });
        });
    });
});

