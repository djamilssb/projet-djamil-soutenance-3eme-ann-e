import AnswerController from "@/app/api/controllers/AnswerController";
import Answer from "@/app/api/models/Answer";
import AnswerService from "@/app/api/services/AnswerService";
import { NextRequest } from "next/server";

jest.mock("@/app/api/services/AnswerService");

describe("AnswerController", () => {
    let answerController: AnswerController;
    let answerService: jest.Mocked<AnswerService>;

    beforeEach(() => {
        
        jest.spyOn(console, "error").mockImplementation(() => {});
        
        jest.clearAllMocks();
        
        answerService = new AnswerService() as jest.Mocked<AnswerService>;
        answerController = new AnswerController();
        answerController["answerService"] = answerService;
    });

    // GET ALL answers
    describe("getAllAnswers", () => {
        it("should return status 200 and a list of answers", async () => {
            const aOne: Answer = new Answer({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
             });
            const aTwo: Answer = new Answer({ 
                id: 2,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 2,
                content: "test content 2",
                explication: "test explication 2",
                isCorrect: true
             });

            answerService.getAll.mockResolvedValue([aOne, aTwo]);

            const req = {} as NextRequest;
            const response = await answerController.getAllAnswers(req);

            expect(answerService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual([
                aOne,
                aTwo
            ]);
        });

        it("should return status 500 if service fails", async () => {
            answerService.getAll.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await answerController.getAllAnswers(req);

            expect(answerService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer les réponses." });
        });
    });

    // GET Answer BY ID
    describe("getAnswerById", () => {
        it("should return status 200 and an answer", async () => {
            const newAnswer: Answer = new Answer({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
            });
            answerService.getById.mockResolvedValue(newAnswer);

            const req = {} as NextRequest;
            const response = await answerController.getAnswerById(req, 1);

            expect(answerService.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
            });
        });

        it("should return status 404 if answer is not found", async () => {
            answerService.getById.mockResolvedValue(null);

            const req = {} as NextRequest;
            const response = await answerController.getAnswerById(req, 999);

            expect(answerService.getById).toHaveBeenCalledWith(999);
            expect(response.status).toBe(404);
            expect(await response.json()).toEqual({ message: "Réponse introuvable." });
        });

        it("should return status 400 for invalid answer ID", async () => {
            const req = {} as NextRequest;
            const response = await answerController.getAnswerById(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID réponse invalide." });
        });
    });

    // CREATE Answer
    describe("createAnswer", () => {
        it("should return status 201 and a success message", async () => {
            answerService.create.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = {
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
            };

            const response = await answerController.createAnswer(req, body);

            expect(answerService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(201);
            expect(await response.json()).toEqual({ message: "Réponse créé avec succès." });
        });

        it("should return status 400 if required fields are missing", async () => {
            const req = {} as NextRequest;
            const body = { content: "Answer 1" };

            const response = await answerController.createAnswer(req, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Données de réponse manquantes." });
        });

        it("should return status 500 if service fails", async () => {
            answerService.create.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = {
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
            };

            const response = await answerController.createAnswer(req, body);

            expect(answerService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de créer la réponse." });
        });
    });

    // UPDATE Answer
    describe("updateAnswer", () => {
        it("should return status 200 and a success message", async () => {
            answerService.update.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = { content: "new answer content" };

            const response = await answerController.updateAnswer(req, 1, body);

            expect(answerService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Réponse mis à jour avec succès." });
        });

        it("should return status 400 for invalid answer ID", async () => {
            const req = {} as NextRequest;
            const body = { content: "new answer content" };

            const response = await answerController.updateAnswer(req, NaN, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID réponse invalide." });
        });

        it("should return status 500 if service fails", async () => {
            answerService.update.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = { content: "new answer content" };

            const response = await answerController.updateAnswer(req, 1, body);

            expect(answerService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de mettre à jour la réponse." });
        });
    });

    // DELETE Answer
    describe("deleteAnswer", () => {
        it("should return status 200 and a success message", async () => {
            answerService.delete.mockResolvedValue(true);

            const req = {} as NextRequest;
            const response = await answerController.deleteAnswer(req, 1);

            expect(answerService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Réponse supprimé avec succès." });
        });

        it("should return status 400 for invalid answer ID", async () => {
            const req = {} as NextRequest;
            const response = await answerController.deleteAnswer(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID réponse invalide." });
        });

        it("should return status 500 if service fails", async () => {
            answerService.delete.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await answerController.deleteAnswer(req, 1);

            expect(answerService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de supprimer la réponse." });
        });
    });

    // GET answers by quizz
    describe("getAnswersByQuizz", () => {
        it("should return status 200 and a list of answers", async () => {
            const aOne: Answer = new Answer({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
            });
            const aTwo: Answer = new Answer({ 
                id: 2,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 2,
                content: "test content 2",
                explication: "test explication 2",
                isCorrect: true
            });
            const quizzId: number = 2;

            answerService.getAnswersByQuizz.mockResolvedValue([aOne, aTwo]);

            const req = {} as NextRequest;
            const response = await answerController.getAnswersByQuizz(req, quizzId);

            expect(answerService.getAnswersByQuizz).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual([
                aOne,
                aTwo
            ]);
        });

        it("should return status 500 if service fails", async () => {
            const quizzId: number = 2;
            answerService.getAnswersByQuizz.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await answerController.getAnswersByQuizz(req, quizzId);

            expect(answerService.getAnswersByQuizz).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer les réponses." });
        });
    });

    // GET answers by question
    describe("getAnswersByQuestion", () => {
        it("should return status 200 and a list of answers", async () => {
            const aOne: Answer = new Answer({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
            });
            const aTwo: Answer = new Answer({ 
                id: 2,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 2,
                content: "test content 2",
                explication: "test explication 2",
                isCorrect: true
            });
            const questionId: number = 1;

            answerService.getAnswersByQuestion.mockResolvedValue([aOne, aTwo]);

            const req = {} as NextRequest;
            const response = await answerController.getAnswersByQuestion(req, questionId);

            expect(answerService.getAnswersByQuestion).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual([
                aOne,
                aTwo
            ]);
        });

        it("should return status 500 if service fails", async () => {
            const questionId: number = 1;
            answerService.getAnswersByQuestion.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await answerController.getAnswersByQuestion(req, questionId);

            expect(answerService.getAnswersByQuestion).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer les réponses." });
        });
    });
});