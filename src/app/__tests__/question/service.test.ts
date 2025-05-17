import QuestionService from "@/app/api/services/QuestionService";
import QuestionRepository from "@/app/api/repositories/QuestionRepository";
import Question from "@/app/api/models/Question";

jest.mock("@/app/api/repositories/QuestionRepository");

describe("QuestionService", () => {
    let questionService: QuestionService;
    let questionRepository: jest.Mocked<QuestionRepository>;

    beforeEach(() => {
        questionRepository = new QuestionRepository() as jest.Mocked<QuestionRepository>;
        questionService = new QuestionService(questionRepository);
        // (questionService as any).qRepository = questionRepository;
        jest.clearAllMocks();
    });

    it("should retrieve all questions", async () => {
        const mockQuestions = [
            new Question({ id: 1, idQuizz: 1, orderIndex: 1, content: "Question 1" }),
            new Question({ id: 2, idQuizz: 1, orderIndex: 2, content: "Question 2" }),
        ];
        questionRepository.getAll.mockResolvedValue(mockQuestions);
        
        const questions = await questionService.getAll();
        
        expect(questionRepository.getAll).toHaveBeenCalled();
        expect(questions).toHaveLength(2);
        expect(questions[0].getContent()).toBe("Question 1");
    });

    it("should retrieve a question by ID", async () => {
        const mockQuestion = new Question({ id: 1, idQuizz: 1, orderIndex: 1, content: "Question 1" });
        questionRepository.getById.mockResolvedValue(mockQuestion);

        const question = await questionService.getById(1);

        expect(questionRepository.getById).toHaveBeenCalledWith(1);
        expect(question?.getContent()).toBe("Question 1");
    });

    it("should create a question", async () => {
        questionRepository.create.mockResolvedValue(true);

        const result = await questionService.create({ id: 1, idQuizz: 1, orderIndex: 1, content: "Question 1" });

        expect(questionRepository.create).toHaveBeenCalledWith({ id: 1, idQuizz: 1, orderIndex: 1, content: "Question 1" });
        expect(result).toBe(true);
    });

    it("should update a question", async () => {
        questionRepository.update.mockResolvedValue(true);

        const result = await questionService.update(1, { idQuizz: 1, orderIndex: 2, content: "Question content" });

        expect(questionRepository.update).toHaveBeenCalledWith(1, { idQuizz: 1, orderIndex: 2, content: "Question content" });
        expect(result).toBe(true);
    });

    it("should delete a question", async () => {
        questionRepository.delete.mockResolvedValue(true);

        const result = await questionService.delete(1);

        expect(questionRepository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });

    it("should retrieve all questions by quizz", async () => {
        const mockQuestions = [
            new Question({ id: 1, idQuizz: 1, orderIndex: 1, content: "Question 1" }),
            new Question({ id: 2, idQuizz: 1, orderIndex: 2, content: "Question 2" }),
        ];
        questionRepository.getQuestionsByQuizz.mockResolvedValue(mockQuestions);

        const questions = await questionService.getQuestionsByQuizz(1);

        expect(questionRepository.getQuestionsByQuizz).toHaveBeenCalled();
        expect(questions).toHaveLength(2);
        expect(questions[0].getQuizzId()).toBe(1);
    });
});