import AnswerService from "@/app/api/services/AnswerService";
import AnswerRepository from "@/app/api/repositories/AnswerRepository";
import Answer from "@/app/api/models/Answer";

jest.mock("@/app/api/repositories/AnswerRepository");

describe("AnswerService", () => {
    let answerService: AnswerService;
    let answerRepository: jest.Mocked<AnswerRepository>;

    beforeEach(() => {
        answerRepository = new AnswerRepository() as jest.Mocked<AnswerRepository>;
        answerService = new AnswerService(answerRepository);
        jest.clearAllMocks();
    });

    it("should retrieve all answers", async () => {
        const mockQuestions = [
            new Answer({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
            }),
            new Answer({ 
                id: 2,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 2,
                content: "test content 2",
                explication: "test explication 2",
                isCorrect: true
            }),
        ];
        answerRepository.getAll.mockResolvedValue(mockQuestions);
        
        const questions = await answerService.getAll();
        
        expect(answerRepository.getAll).toHaveBeenCalled();
        expect(questions).toHaveLength(2);
        expect(questions[0].getContent()).toBe("test content 1");
    });

    it("should retrieve an answer by ID", async () => {
        const mockAnswer = new Answer({ 
            id: 1,
            idQuizz: 2,
            idQuestion: 1,
            orderIndex: 3,
            content: "test content 1",
            explication: "test explication 1",
            isCorrect: false
        });
        answerRepository.getById.mockResolvedValue(mockAnswer);

        const answer = await answerService.getById(1);

        expect(answerRepository.getById).toHaveBeenCalledWith(1);
        expect(answer?.getContent()).toBe("test content 1");
    });

    it("should create an answer", async () => {
        answerRepository.create.mockResolvedValue(true);

        const result = await answerService.create({ 
            idQuizz: 2,
            idQuestion: 1,
            orderIndex: 3,
            content: "test content 1",
            explication: "test explication 1",
            isCorrect: false
        });

        expect(answerRepository.create).toHaveBeenCalledWith({ 
            idQuizz: 2,
            idQuestion: 1,
            orderIndex: 3,
            content: "test content 1",
            explication: "test explication 1",
            isCorrect: false
        });
        expect(result).toBe(true);
    });

    it("should update an answer", async () => {
        answerRepository.update.mockResolvedValue(true);

        const result = await answerService.update(1, { idQuizz: 1, orderIndex: 2, content: "Answer content" });

        expect(answerRepository.update).toHaveBeenCalledWith(1, { idQuizz: 1, orderIndex: 2, content: "Answer content" });
        expect(result).toBe(true);
    });

    it("should delete an answer", async () => {
        answerRepository.delete.mockResolvedValue(true);

        const result = await answerService.delete(1);

        expect(answerRepository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it("should retrieve all answers by quizz", async () => {
        const mockAnswers = [
            new Answer({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
            }),
            new Answer({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 2,
                content: "test content 2",
                explication: "test explication 2",
                isCorrect: false
            }),
        ];
        answerRepository.getAnswersByQuizz.mockResolvedValue(mockAnswers);

        const answers = await answerService.getAnswersByQuizz(2);

        expect(answerRepository.getAnswersByQuizz).toHaveBeenCalled();
        expect(answers).toHaveLength(2);
        expect(answers[0].getQuizzId()).toBe(2);
    });

    it("should retrieve all answers by question", async () => {
        const mockAnswers = [
            new Answer({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 3,
                content: "test content 1",
                explication: "test explication 1",
                isCorrect: false
            }),
            new Answer({ 
                id: 1,
                idQuizz: 2,
                idQuestion: 1,
                orderIndex: 2,
                content: "test content 2",
                explication: "test explication 2",
                isCorrect: false
            }),
        ];
        answerRepository.getAnswersByQuestion.mockResolvedValue(mockAnswers);

        const answers = await answerService.getAnswersByQuestion(1);

        expect(answerRepository.getAnswersByQuestion).toHaveBeenCalled();
        expect(answers).toHaveLength(2);
        expect(answers[0].getQuestionId()).toBe(1);
    });
});