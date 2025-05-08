import QuestionController from "@/app/api/controllers/QuestionController";
import Question from "@/app/api/models/Question";
import QuestionService from "@/app/api/services/QuestionService";
import { NextRequest } from "next/server";

jest.mock("@/app/api/services/QuestionService");

describe("QuestionController", () => {
    let questionController: QuestionController;
    let questionService: jest.Mocked<QuestionService>;

    beforeEach(() => {
        
        jest.spyOn(console, "error").mockImplementation(() => {});
        
        jest.clearAllMocks();
        
        questionService = new QuestionService() as jest.Mocked<QuestionService>;
        questionController = new QuestionController();
        questionController["questionService"] = questionService;
    });

    // GET ALL QUESTIONS
    describe("getAllQuestions", () => {
        it("should return status 200 and a list of questions", async () => {
            const qOne: Question = new Question({ id: 1, idQuizz: 1, orderIndex: 1, content: "Question 1" });
            const qTwo: Question = new Question({ id: 2, idQuizz: 1, orderIndex: 2, content: "Question 2" });

            questionService.getAll.mockResolvedValue([qOne, qTwo]);

            const req = {} as NextRequest;
            const response = await questionController.getAllQuestions(req);

            expect(questionService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual([
                qOne,
                qTwo
            ]);
        });

        it("should return status 500 if service fails", async () => {
            questionService.getAll.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await questionController.getAllQuestions(req);

            expect(questionService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer les questions." });
        });
    });

    // GET QUESTION BY ID
    describe("getQuestionById", () => {
        it("should return status 200 and a question", async () => {
            const newQuestion: Question = new Question({ id: 1, idQuizz: 1, orderIndex: 1, content: "Question 1" });
            questionService.getById.mockResolvedValue(newQuestion);

            const req = {} as NextRequest;
            const response = await questionController.getQuestionById(req, 1);

            expect(questionService.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ id: 1, idQuizz: 1, orderIndex: 1, content: "Question 1" });
        });

        it("should return status 404 if question is not found", async () => {
            questionService.getById.mockResolvedValue(null);

            const req = {} as NextRequest;
            const response = await questionController.getQuestionById(req, 999);

            expect(questionService.getById).toHaveBeenCalledWith(999);
            expect(response.status).toBe(404);
            expect(await response.json()).toEqual({ message: "Question introuvable." });
        });

        it("should return status 400 for invalid question ID", async () => {
            const req = {} as NextRequest;
            const response = await questionController.getQuestionById(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID question invalide." });
        });
    });

    // CREATE QUESTION
    describe("createQuestion", () => {
        it("should return status 201 and a success message", async () => {
            questionService.create.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = {
                idQuizz: 1,
                orderIndex: 1,
                content: "Question 1",
            };

            const response = await questionController.createQuestion(req, body);

            expect(questionService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(201);
            expect(await response.json()).toEqual({ message: "Question créé avec succès." });
        });

        it("should return status 400 if required fields are missing", async () => {
            const req = {} as NextRequest;
            const body = { content: "Question 1" };

            const response = await questionController.createQuestion(req, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Données de questions manquantes." });
        });

        it("should return status 500 if service fails", async () => {
            questionService.create.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = {
                idQuizz: 1,
                orderIndex: 1,
                content: "Question 1",
            };

            const response = await questionController.createQuestion(req, body);

            expect(questionService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de créer la question." });
        });
    });

    // UPDATE QUESTION
    describe("updateQuestion", () => {
        it("should return status 200 and a success message", async () => {
            questionService.update.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = { content: "new question content" };

            const response = await questionController.updateQuestion(req, 1, body);

            expect(questionService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Question mis à jour avec succès." });
        });

        it("should return status 400 for invalid question ID", async () => {
            const req = {} as NextRequest;
            const body = { content: "new question content" };

            const response = await questionController.updateQuestion(req, NaN, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID question invalide." });
        });

        it("should return status 500 if service fails", async () => {
            questionService.update.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = { content: "new question content" };

            const response = await questionController.updateQuestion(req, 1, body);

            expect(questionService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de mettre à jour la question." });
        });
    });

    // DELETE QUESTION
    describe("deleteQuestion", () => {
        it("should return status 200 and a success message", async () => {
            questionService.delete.mockResolvedValue(true);

            const req = {} as NextRequest;
            const response = await questionController.deleteQuestion(req, 1);

            expect(questionService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Question supprimé avec succès." });
        });

        it("should return status 400 for invalid question ID", async () => {
            const req = {} as NextRequest;
            const response = await questionController.deleteQuestion(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID question invalide." });
        });

        it("should return status 500 if service fails", async () => {
            questionService.delete.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await questionController.deleteQuestion(req, 1);

            expect(questionService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de supprimer la question." });
        });
    });

    // GET QUESTIONS BY QUIZZ
    describe("getQuestionsByQuizz", () => {
        it("should return status 200 and a list of questions", async () => {
            const qOne: Question = new Question({ id: 1, idQuizz: 1, orderIndex: 1, content: "Question 1" });
            const qTwo: Question = new Question({ id: 2, idQuizz: 1, orderIndex: 2, content: "Question 2" });
            const quizzId: number = 1;

            questionService.getQuestionsByQuizz.mockResolvedValue([qOne, qTwo]);

            const req = {} as NextRequest;
            const response = await questionController.getQuestionsByQuizz(req, quizzId);

            expect(questionService.getQuestionsByQuizz).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual([
                qOne,
                qTwo
            ]);
        });

        it("should return status 500 if service fails", async () => {
            questionService.getQuestionsByQuizz.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await questionController.getQuestionsByQuizz(req, 1);

            expect(questionService.getQuestionsByQuizz).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer les questions." });
        });
    });
});