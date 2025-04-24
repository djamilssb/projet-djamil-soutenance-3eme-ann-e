import SaveQuizzRepository from "@/app/api/repositories/SaveQuizzRepository";
import executeQuery from "@/utils/executeQuery";
import SaveQuizz from "@/app/api/models/SaveQuizz";

jest.mock("@/utils/executeQuery");

describe("SaveQuizzRepository", () => {
    let repository: SaveQuizzRepository;

    beforeEach(() => {
        repository = new SaveQuizzRepository();
        jest.clearAllMocks();
    });

    it("should retrieve all quiz saves", async () => {
        const mockRows = [
            { id: 1, id_user: 1, id_quizz: 1, id_character: 1 },
            { id: 2, id_user: 2, id_quizz: 2, id_character: 2 },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockRows);

        const result = await repository.getAll();

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_savequizz", []);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(SaveQuizz);
        expect(result[0].id).toBe(1);
    });

    it("should retrieve a quiz save by ID", async () => {
        const mockRow = { id: 1, id_user: 1, id_quizz: 1, id_character: 1 };
        (executeQuery as jest.Mock).mockResolvedValue([mockRow]);

        const result = await repository.getById(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_savequizz WHERE id = ?", [1]);
        expect(result).toBeInstanceOf(SaveQuizz);
        expect(result?.id).toBe(1);
    });

    it("should return null if quiz save is not found", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const result = await repository.getById(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_savequizz WHERE id = ?", [999]);
        expect(result).toBeNull();
    });

    it("should create a quiz save", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const saveQuizz = new SaveQuizz({ id_user: 1, id_quizz: 1, id_character: 1 });
        const result = await repository.create(saveQuizz);

        expect(executeQuery).toHaveBeenCalledWith("INSERT INTO kt_savequizz SET ?", [saveQuizz]);
        expect(result).toBe(true);
    });

    it("should update a quiz save", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await repository.update(1, 1, 1, { score: 100 });

        expect(executeQuery).toHaveBeenCalledWith(
            "UPDATE kt_savequizz SET ? WHERE id = ? AND id_user = ? AND id_quizz = ?",
            [{ score: 100 }, 1, 1, 1]
        );
        expect(result).toBe(true);
    });

    it("should delete a quiz save", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await repository.delete(1);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM kt_savequizz WHERE id = ?", [1]);
        expect(result).toBe(true);
    });
});