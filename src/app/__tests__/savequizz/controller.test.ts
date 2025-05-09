import SaveQuizzController from "@/app/api/controllers/SaveQuizzController";
import SaveQuizzService from "@/app/api/services/SaveQuizzService";
import SaveQuizz from "@/app/api/models/SaveQuizz";
import { NextRequest } from "next/server";

jest.mock("@/app/api/services/SaveQuizzService");

describe("SaveQuizzController", () => {
    let saveQuizzController: SaveQuizzController;
    let saveQuizzService: jest.Mocked<SaveQuizzService>;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
        saveQuizzService = new SaveQuizzService() as jest.Mocked<SaveQuizzService>;
        saveQuizzController = new SaveQuizzController();
        saveQuizzController["saveQuizzService"] = saveQuizzService;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // GET ALL
    describe("getAll", () => {
        it("should return status 200 and a list of quiz saves", async () => {
            const mockQuizSaves = [
                new SaveQuizz({ id: 1, id_user: 1, id_quizz: 1, id_character: 1 }),
                new SaveQuizz({ id: 2, id_user: 2, id_quizz: 2, id_character: 2 }),
            ];
            saveQuizzService.getAll.mockResolvedValue(mockQuizSaves);

            const req = {} as NextRequest;
            const response = await saveQuizzController.getAll(req);

            expect(saveQuizzService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockQuizSaves);
        });

        it("should return status 500 if service fails", async () => {
            saveQuizzService.getAll.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await saveQuizzController.getAll(req);

            expect(saveQuizzService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to retrieve quiz saves." });
        });
    });

    // GET BY ID
    describe("getById", () => {
        it("should return status 200 and a quiz save", async () => {
            const mockQuizSave = new SaveQuizz({ id: 1, id_user: 1, id_quizz: 1, id_character: 1 });
            saveQuizzService.getById.mockResolvedValue(mockQuizSave);

            const req = {} as NextRequest;
            const response = await saveQuizzController.getById(req, 1);

            expect(saveQuizzService.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockQuizSave);
        });

        it("should return status 404 if quiz save is not found", async () => {
            saveQuizzService.getById.mockResolvedValue(null);

            const req = {} as NextRequest;
            const response = await saveQuizzController.getById(req, 999);

            expect(saveQuizzService.getById).toHaveBeenCalledWith(999);
            expect(response.status).toBe(404);
            expect(await response.json()).toEqual({ message: "Quiz save not found." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const response = await saveQuizzController.getById(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid quiz save ID." });
        });

        it("should return status 500 if service fails", async () => {
            saveQuizzService.getById.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await saveQuizzController.getById(req, 1);

            expect(saveQuizzService.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to retrieve quiz save with ID 1." });
        });
    });

    // CREATE
    describe("create", () => {
        it("should return status 201 if quiz save is created", async () => {
            saveQuizzService.create.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = new SaveQuizz({ id_user: 1, id_quizz: 1, id_character: 1 });
            const response = await saveQuizzController.create(req, body);

            expect(saveQuizzService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(201);
            expect(await response.json()).toEqual({ message: "Quiz save created successfully." });
        });

        it("should return status 400 for invalid data", async () => {
            const req = {} as NextRequest;
            const body = { id_user: 1, id_quizz: "invalid" };
            const response = await saveQuizzController.update(req, 1, body);
        
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Failed to update quiz save." });
        });
        
        it("should return status 500 if service fails", async () => {
            saveQuizzService.update.mockRejectedValue(new Error("Service error"));
        
            const req = {} as NextRequest;
            const body = { id_user: 1, id_quizz: 1, score: 10 };
            const response = await saveQuizzController.update(req, 1, body);
        
            expect(saveQuizzService.update).toHaveBeenCalledWith(1, 1, 1, { score: 10 });
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to update quiz save with ID 1." });
        });
    });

    // UPDATE
    describe("update", () => {
        it("should return status 200 if quiz save is updated", async () => {
            saveQuizzService.update.mockResolvedValue(true);
        
            const req = {} as NextRequest;
            const body = { id_user: 1, id_quizz: 1, score: 10 };
            const response = await saveQuizzController.update(req, 1, body);
        
            expect(saveQuizzService.update).toHaveBeenCalledWith(1, 1, 1, { score: 10 });
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Quiz save updated successfully." });
        });

        it("should return status 400 for invalid data", async () => {
            const req = {} as NextRequest;
            const body = { id_user: 1, id_quizz: 1, score: 10 };
            const response = await saveQuizzController.update(req, 1, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Failed to update quiz save." });
        });

        it("should return status 500 if service fails", async () => {
            saveQuizzService.update.mockRejectedValue(new Error("Service error"));
        
            const req = {} as NextRequest;
            const body = { id_user: 1, id_quizz: 1, score: 10 };
            const response = await saveQuizzController.update(req, 1, body);
        
            expect(saveQuizzService.update).toHaveBeenCalledWith(1, 1, 1, { score: 10 });
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to update quiz save with ID 1." });
        });
    });

    // DELETE
    describe("delete", () => {
        it("should return status 200 if quiz save is deleted", async () => {
            saveQuizzService.delete.mockResolvedValue(true);

            const req = {} as NextRequest;
            const response = await saveQuizzController.delete(req, 1);

            expect(saveQuizzService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Quiz save deleted successfully." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const response = await saveQuizzController.delete(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid quiz save ID." });
        });

        it("should return status 500 if service fails", async () => {
            saveQuizzService.delete.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await saveQuizzController.delete(req, 1);

            expect(saveQuizzService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to delete quiz save with ID 1." });
        });
    });
});