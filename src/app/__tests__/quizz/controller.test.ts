import QuizzController from "@/app/api/controllers/QuizzController";
import QuizzService from "@/app/api/services/QuizzService";
import Quizz from "@/app/api/models/Quizz";
import { NextRequest } from "next/server";

jest.mock("@/app/api/services/QuizzService");

describe("QuizzController", () => {
    let quizzController: QuizzController;
    let quizzService: jest.Mocked<QuizzService>;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
        quizzService = new QuizzService() as jest.Mocked<QuizzService>;
        quizzController = new QuizzController();
        quizzController["quizzService"] = quizzService;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // GET ALL
    describe("getAll", () => {
        it("should return status 200 and a list of quizzes", async () => {
            const mockQuizzes = [
                new Quizz({ id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 }),
                new Quizz({ id: 2, id_user: 1, title: "Quiz 2", id_departement: 2 }),
            ];
            quizzService.getAll.mockResolvedValue(mockQuizzes);

            const req = {} as NextRequest;
            const response = await quizzController.getAll(req);

            expect(quizzService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockQuizzes);
        });

        it("should return status 200 and an empty array when no quizzes exist", async () => {
            quizzService.getAll.mockResolvedValue([]);

            const req = {} as NextRequest;
            const response = await quizzController.getAll(req);

            expect(quizzService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual([]);
        });

        it("should return status 500 if service fails", async () => {
            quizzService.getAll.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await quizzController.getAll(req);

            expect(quizzService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer les quizz." });
        });
    });

    // GET BY ID
    describe("getById", () => {
        it("should return status 200 and a quizz", async () => {
            const mockQuizz = new Quizz({ id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 });
            quizzService.getById.mockResolvedValue(mockQuizz);

            const req = {} as NextRequest;
            const response = await quizzController.getById(req, 1);

            expect(quizzService.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockQuizz);
        });

        it("should return status 404 if quizz is not found", async () => {
            quizzService.getById.mockResolvedValue(null);

            const req = {} as NextRequest;
            const response = await quizzController.getById(req, 999);

            expect(quizzService.getById).toHaveBeenCalledWith(999);
            expect(response.status).toBe(404);
            expect(await response.json()).toEqual({ message: "Quizz introuvable." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const response = await quizzController.getById(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID de quizz invalide." });
        });

        it("should return status 500 if service fails", async () => {
            quizzService.getById.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await quizzController.getById(req, 1);

            expect(quizzService.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer le quizz." });
        });
    });

    // CREATE
    describe("create", () => {
        it("should return status 201 if quizz is created", async () => {
            quizzService.create.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = { id_user: 1, title: "New Quiz", id_departement: 1 };
            const response = await quizzController.create(req, body);

            expect(quizzService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(201);
            expect(await response.json()).toEqual({ message: "Quizz créé avec succès." });
        });

        it("should return status 400 for missing title", async () => {
            const req = {} as NextRequest;
            const body = { id_user: 1 };
            const response = await quizzController.create(req, body);

            expect(quizzService.create).not.toHaveBeenCalled();
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Données du quizz incomplètes." });
        });

        it("should return status 400 for missing id_user", async () => {
            const req = {} as NextRequest;
            const body = { title: "Quiz without user" };
            const response = await quizzController.create(req, body);

            expect(quizzService.create).not.toHaveBeenCalled();
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Données du quizz incomplètes." });
        });

        it("should return status 400 if creation fails", async () => {
            quizzService.create.mockResolvedValue(false);

            const req = {} as NextRequest;
            const body = { id_user: 1, title: "Failed Quiz" };
            const response = await quizzController.create(req, body);

            expect(quizzService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Échec de la création du quizz." });
        });

        it("should return status 500 if service fails", async () => {
            quizzService.create.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = { id_user: 1, title: "Error Quiz" };
            const response = await quizzController.create(req, body);

            expect(quizzService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de créer le quizz." });
        });
    });

    // UPDATE
    describe("update", () => {
        it("should return status 200 if quizz is updated", async () => {
            quizzService.update.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = { title: "Updated Quiz", description: "New description" };
            const response = await quizzController.update(req, 1, body);

            expect(quizzService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Quizz mis à jour avec succès." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const body = { title: "Invalid ID Quiz" };
            const response = await quizzController.update(req, NaN, body);

            expect(quizzService.update).not.toHaveBeenCalled();
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID de quizz invalide." });
        });

        it("should return status 400 if update fails", async () => {
            quizzService.update.mockResolvedValue(false);

            const req = {} as NextRequest;
            const body = { title: "Failed Update" };
            const response = await quizzController.update(req, 1, body);

            expect(quizzService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Échec de la mise à jour du quizz." });
        });

        it("should return status 500 if service fails", async () => {
            quizzService.update.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = { title: "Error Update" };
            const response = await quizzController.update(req, 1, body);

            expect(quizzService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de mettre à jour le quizz." });
        });
    });

    // DELETE
    describe("delete", () => {
        it("should return status 200 if quizz is deleted", async () => {
            quizzService.delete.mockResolvedValue(true);

            const req = {} as NextRequest;
            const response = await quizzController.delete(req, 1);

            expect(quizzService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Quizz supprimé avec succès." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const response = await quizzController.delete(req, NaN);

            expect(quizzService.delete).not.toHaveBeenCalled();
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID de quizz invalide." });
        });

        it("should return status 400 if deletion fails", async () => {
            quizzService.delete.mockResolvedValue(false);

            const req = {} as NextRequest;
            const response = await quizzController.delete(req, 1);

            expect(quizzService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Échec de la suppression du quizz." });
        });

        it("should return status 500 if service fails", async () => {
            quizzService.delete.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await quizzController.delete(req, 1);

            expect(quizzService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de supprimer le quizz." });
        });
    });

    // GET BY USER ID
    describe("getByUserId", () => {
        it("should return status 200 and a list of quizzes for a user", async () => {
            const mockQuizzes = [
                new Quizz({ id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 }),
                new Quizz({ id: 2, id_user: 1, title: "Quiz 2", id_departement: 2 }),
            ];
            quizzService.getByUserId.mockResolvedValue(mockQuizzes);

            const req = {} as NextRequest;
            const response = await quizzController.getByUserId(req, 1);

            expect(quizzService.getByUserId).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockQuizzes);
        });

        it("should return status 400 for invalid user ID", async () => {
            const req = {} as NextRequest;
            const response = await quizzController.getByUserId(req, NaN);

            expect(quizzService.getByUserId).not.toHaveBeenCalled();
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID utilisateur invalide." });
        });

        it("should return status 500 if service fails", async () => {
            quizzService.getByUserId.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await quizzController.getByUserId(req, 1);

            expect(quizzService.getByUserId).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer les quizz de l'utilisateur." });
        });
    });

    // GET BY DEPARTEMENT ID
    describe("getByDepartementId", () => {
        it("should return status 200 and a list of quizzes for a departement", async () => {
            const mockQuizzes = [
                new Quizz({ id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 }),
                new Quizz({ id: 3, id_user: 2, title: "Quiz 3", id_departement: 1 }),
            ];
            quizzService.getByDepartementId.mockResolvedValue(mockQuizzes);

            const req = {} as NextRequest;
            const response = await quizzController.getByDepartementId(req, 1);

            expect(quizzService.getByDepartementId).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockQuizzes);
        });

        it("should return status 400 for invalid departement ID", async () => {
            const req = {} as NextRequest;
            const response = await quizzController.getByDepartementId(req, NaN);

            expect(quizzService.getByDepartementId).not.toHaveBeenCalled();
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID département invalide." });
        });

        it("should return status 500 if service fails", async () => {
            quizzService.getByDepartementId.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await quizzController.getByDepartementId(req, 1);

            expect(quizzService.getByDepartementId).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer les quizz du département." });
        });
    });
});