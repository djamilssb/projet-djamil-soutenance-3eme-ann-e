import QuestionRepository from "@/app/api/repositories/QuestionRepository";
import Question from "@/app/api/models/Question";
import executeQuery from "@/utils/executeQuery";

jest.mock("@/utils/executeQuery");

describe("QuestionRepository", () => {
    let questionRepository: QuestionRepository;

    beforeEach(() => {
        questionRepository = new QuestionRepository();
        jest.clearAllMocks();
    });

    it("should retrieve all questions", async () => {
        const mockData = [
            { id: 1, id_quizz: 1, order_index: 1, content: "Question 1" },
            { id: 2, id_quizz: 1, order_iIndex: 2, content: "Question 2" },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const questions = await questionRepository.getAll();

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_questions", []);
        expect(questions).toHaveLength(2);
        expect(questions[0]).toBeInstanceOf(Question);
        expect(questions[0].getContent()).toBe("Question 1");
    });

    it("should retrieve a question by ID", async () => {
        const mockData = [{ id: 1, id_quizz: 1, order_index: 1, content: "Question 1" }];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const question = await questionRepository.getById(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_questions WHERE id = ?", [1]);
        expect(question).toBeInstanceOf(Question);
        expect(question?.getContent()).toBe("Question 1");
    });

    it("should return null if question is not found", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const question = await questionRepository.getById(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_questions WHERE id = ?", [999]);
        expect(question).toBeNull();
    });

    it("should create a question", async () => {
        const mockData = new Question({ id_quizz: 1, order_index: 1, content: "Question 1" });
    
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });
    
        const result = await questionRepository.create(mockData);
    
        expect(executeQuery).toHaveBeenCalledWith("INSERT INTO kt_questions SET ?", [
            { 
                id_quizz: 1, 
                order_index: 1, 
                content: "Question 1" 
            },
        ]);
        expect(result).toStrictEqual({"affectedRows": 1});
    });

    it("should update a question", async () => {

        const mockData = new Question({ id: 1, id_quizz: 1, order_index: 1, content: "Question 1" });
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await questionRepository.update(mockData.getId()!, mockData);

        expect(executeQuery).toHaveBeenCalledWith("UPDATE kt_questions SET ? WHERE id = ?", [mockData, 1]);
        expect(result).toBe(true);
    });

    it("should delete a question", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await questionRepository.delete(1);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM kt_questions WHERE id = ?", [1]);
        expect(result).toBe(true);
    });

    it("should retrieve all questions by quizz", async () => {
        const mockData = [
            { id: 1, id_quizz: 1, order_index: 1, content: "Question 1" },
            { id: 2, id_quizz: 1, order_index: 2, content: "Question 2" },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const questions = await questionRepository.getQuestionsByQuizz(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_questions WHERE id_quizz = ?", [1]);
        expect(questions).toHaveLength(2);
        expect(questions[0]).toBeInstanceOf(Question);
        expect(questions[0].getContent()).toBe("Question 1");
    });
});