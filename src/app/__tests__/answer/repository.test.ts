import AnswerRepository from "@/app/api/repositories/AnswerRepository";
import Answer from "@/app/api/models/Answer";
import executeQuery from "@/utils/executeQuery";

jest.mock("@/utils/executeQuery");

describe("AnswerRepository", () => {
    let answerRepository: AnswerRepository;

    beforeEach(() => {
        answerRepository = new AnswerRepository();
        jest.clearAllMocks();
    });

    it("should retrieve all answers", async () => {
        const mockData = [
            { 
                id: 1,
                id_quizz: 2,
                id_question: 1,
                order_index: 3,
                content: "test content 1",
                explication: "test explication 1",
                is_correct: false
            },
            { 
                id: 2,
                id_quizz: 2,
                id_question: 1,
                order_index: 2,
                content: "test content 2",
                explication: "test explication 2",
                is_correct: false
            },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const answers = await answerRepository.getAll();

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_answers", []);
        expect(answers).toHaveLength(2);
        expect(answers[0]).toBeInstanceOf(Answer);
        expect(answers[0].getContent()).toBe("test content 1");
    });

    it("should retrieve an answer by ID", async () => {
        const mockData = [{ 
            id: 1,
            id_quizz: 2,
            id_question: 1,
            order_index: 3,
            content: "test content 1",
            explication: "test explication 1",
            is_correct: false
         }];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const answer = await answerRepository.getById(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_answers WHERE id = ?", [1]);
        expect(answer).toBeInstanceOf(Answer);
        expect(answer?.getContent()).toBe("test content 1");
    });

    it("should return null if answer is not found", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const answer = await answerRepository.getById(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_answers WHERE id = ?", [999]);
        expect(answer).toBeNull();
    });

    it("should create an answer", async () => {
        const mockData = new Answer({ 
            id_quizz: 2,
            id_question: 1,
            order_index: 3,
            content: "test content 1",
            explication: "test explication 1",
            is_correct: false
        });
    
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });
    
        const result = await answerRepository.create(mockData);
    
        expect(executeQuery).toHaveBeenCalledWith("INSERT INTO kt_answers SET ?", [
            { 
                id_quizz: 2,
                id_question: 1,
                order_index: 3,
                content: "test content 1",
                explication: "test explication 1",
                is_correct: false 
            },
        ]);
        expect(result).toBe(true);
    });

    it("should update an answer", async () => {

        const mockData = new Answer({ id: 1, id_quizz: 1, order_index: 1, content: "Answer 1" });
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await answerRepository.update(mockData.getId()!, mockData);

        expect(executeQuery).toHaveBeenCalledWith("UPDATE kt_answers SET ? WHERE id = ?", [mockData, 1]);
        expect(result).toBe(true);
    });

    it("should delete an answer", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await answerRepository.delete(1);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM kt_answers WHERE id = ?", [1]);
        expect(result).toBe(true);
    });

    it("should retrieve all answers by quizz", async () => {
        const mockData = [
            { 
                id: 1, 
                id_quizz: 2,
                id_question: 1,
                order_index: 3,
                content: "test content 1",
                explication: "test explication 1",
                is_correct: false 
            },
            { 
                id: 2, 
                id_quizz: 2,
                id_question: 1,
                order_index: 3,
                content: "test content 2",
                explication: "test explication 2",
                is_correct: false 
            },
        ];
        const quizzId: number = 2;
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const answers = await answerRepository.getAnswersByQuizz(quizzId);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_answers WHERE id_quizz = ?", [quizzId]);
        expect(answers).toHaveLength(2);
        expect(answers[0]).toBeInstanceOf(Answer);
        expect(answers[0].getContent()).toBe("test content 1");
    });

    it("should retrieve all answers by question", async () => {
        const mockData = [
            { 
                id: 1, 
                id_quizz: 2,
                id_question: 1,
                order_index: 3,
                content: "test content 1",
                explication: "test explication 1",
                is_correct: false 
            },
            { 
                id: 2, 
                id_quizz: 2,
                id_question: 1,
                order_index: 3,
                content: "test content 2",
                explication: "test explication 2",
                is_correct: false 
            },
        ];
        const qId: number = 1;
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const answers = await answerRepository.getByQuestionId(qId);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_answers WHERE id_question = ?", [qId]);
        expect(answers).toHaveLength(2);
        expect(answers[0]).toBeInstanceOf(Answer);
        expect(answers[0].getContent()).toBe("test content 1");
    });
});