import QuizzRepository from "@/app/api/repositories/QuizzRepository";
import executeQuery from "@/utils/executeQuery";
import Quizz from "@/app/api/models/Quizz";

jest.mock("@/utils/executeQuery");

describe("QuizzRepository", () => {
    let repository: QuizzRepository;

    beforeEach(() => {
        repository = new QuizzRepository();
        jest.clearAllMocks();
    });

    it("should retrieve all quizzes", async () => {
        const mockRows = [
            { id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 },
            { id: 2, id_user: 2, title: "Quiz 2", id_departement: 2 },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockRows);

        const result = await repository.getAll();

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_quizzes", []);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Quizz);
        expect(result[0].id).toBe(1);
        expect(result[0].title).toBe("Quiz 1");
        expect(result[1].id_departement).toBe(2);
    });

    it("should retrieve a quizz by ID", async () => {
        const mockRow = { id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 };
        (executeQuery as jest.Mock).mockResolvedValue([mockRow]);

        const result = await repository.getById(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_quizzes WHERE id = ?", [1]);
        expect(result).toBeInstanceOf(Quizz);
        expect(result?.id).toBe(1);
        expect(result?.title).toBe("Quiz 1");
    });

    it("should return null if quizz is not found by ID", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const result = await repository.getById(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_quizzes WHERE id = ?", [999]);
        expect(result).toBeNull();
    });

    it("should create a quizz", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const quizz = new Quizz({ 
            id_user: 1, 
            title: "New Quiz", 
            id_departement: 1,
            description: "A new quiz description"
        });
        const result = await repository.create(quizz);

        expect(executeQuery).toHaveBeenCalledWith("INSERT INTO kt_quizzes SET ?", [quizz]);
        expect(result).toStrictEqual({"affectedRows": 1});
    });

    it("should return false if quizz creation fails", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 0 });

        const quizz = new Quizz({ id_user: 1, title: "Failed Quiz" });
        const result = await repository.create(quizz);

        expect(executeQuery).toHaveBeenCalledWith("INSERT INTO kt_quizzes SET ?", [quizz]);
        expect(result).toStrictEqual({"affectedRows": 0});
    });

    it("should update a quizz", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const updates = { title: "Updated Quiz", description: "Updated description" };
        const result = await repository.update(1, updates);

        expect(executeQuery).toHaveBeenCalledWith(
            "UPDATE kt_quizzes SET ? WHERE id = ?",
            [updates, 1]
        );
        expect(result).toBe(true);
    });

    it("should return false if quizz update fails", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 0 });

        const updates = { title: "Updated Quiz" };
        const result = await repository.update(999, updates);

        expect(executeQuery).toHaveBeenCalledWith(
            "UPDATE kt_quizzes SET ? WHERE id = ?",
            [updates, 999]
        );
        expect(result).toBe(false);
    });

    it("should delete a quizz", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await repository.delete(1);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM kt_quizzes WHERE id = ?", [1]);
        expect(result).toBe(true);
    });

    it("should return false if quizz deletion fails", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 0 });

        const result = await repository.delete(999);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM kt_quizzes WHERE id = ?", [999]);
        expect(result).toBe(false);
    });

    it("should retrieve quizzes by user ID", async () => {
        const mockRows = [
            { id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 },
            { id: 2, id_user: 1, title: "Quiz 2", id_departement: 2 },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockRows);

        const result = await repository.getByUserId(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_quizzes WHERE id_user = ?", [1]);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Quizz);
        expect(result[0].id_user).toBe(1);
        expect(result[1].title).toBe("Quiz 2");
    });

    it("should return empty array if no quizzes found for user", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const result = await repository.getByUserId(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_quizzes WHERE id_user = ?", [999]);
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it("should retrieve quizzes by departement ID", async () => {
        const mockRows = [
            { id: 1, id_user: 1, title: "Quiz 1", id_departement: 1 },
            { id: 3, id_user: 2, title: "Quiz 3", id_departement: 1 },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockRows);

        const result = await repository.getByDepartementId(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_quizzes WHERE id_departement = ?", [1]);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Quizz);
        expect(result[0].id_departement).toBe(1);
        expect(result[1].id_user).toBe(2);
    });

    it("should return empty array if no quizzes found for departement", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const result = await repository.getByDepartementId(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_quizzes WHERE id_departement = ?", [999]);
        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it("should handle errors from executeQuery", async () => {
        const error = new Error("Database error");
        (executeQuery as jest.Mock).mockRejectedValue(error);

        await expect(repository.getAll()).rejects.toThrow("Database error");
        await expect(repository.getById(1)).rejects.toThrow("Database error");
        await expect(repository.create({ title: "Test" })).rejects.toThrow("Database error");
        await expect(repository.update(1, { title: "Test" })).rejects.toThrow("Database error");
        await expect(repository.delete(1)).rejects.toThrow("Database error");
        await expect(repository.getByUserId(1)).rejects.toThrow("Database error");
        await expect(repository.getByDepartementId(1)).rejects.toThrow("Database error");
    });
});