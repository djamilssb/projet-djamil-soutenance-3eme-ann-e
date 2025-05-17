import DepartementRepository from "@/app/api/repositories/DepartementRepository";
import executeQuery from "@/utils/executeQuery";
import Departement from "@/app/api/models/Departement";

jest.mock("@/utils/executeQuery");

describe("DepartementRepository", () => {
    let repository: DepartementRepository;

    beforeEach(() => {
        repository = new DepartementRepository();
        jest.clearAllMocks();
    });

    it("should retrieve all departements", async () => {
        const mockRows = [
            { id: 1, name: "Paris", departement_number: "75" },
            { id: 2, name: "Rhône", departement_number: "69" },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockRows);

        const result = await repository.getAll();

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM departement", []);
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(Departement);
        expect(result[0].id).toBe(1);
        expect(result[0].name).toBe("Paris");
        expect(result[0].departement_number).toBe("75");
    });

    it("should retrieve a departement by ID", async () => {
        const mockRow = { id: 1, name: "Paris", departement_number: "75" };
        (executeQuery as jest.Mock).mockResolvedValue([mockRow]);

        const result = await repository.getById(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM departement WHERE id = ?", [1]);
        expect(result).toBeInstanceOf(Departement);
        expect(result?.id).toBe(1);
        expect(result?.name).toBe("Paris");
        expect(result?.departement_number).toBe("75");
    });

    it("should return null if departement is not found by ID", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const result = await repository.getById(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM departement WHERE id = ?", [999]);
        expect(result).toBeNull();
    });

    it("should retrieve a departement by departement number", async () => {
        const mockRow = { id: 1, name: "Paris", departement_number: "75" };
        (executeQuery as jest.Mock).mockResolvedValue([mockRow]);

        const result = await repository.getByDepartementNumber("75");

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM departement WHERE departement_number = ?", ["75"]);
        expect(result).toBeInstanceOf(Departement);
        expect(result?.id).toBe(1);
        expect(result?.name).toBe("Paris");
        expect(result?.departement_number).toBe("75");
    });

    it("should return null if departement is not found by departement number", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const result = await repository.getByDepartementNumber("999");

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM departement WHERE departement_number = ?", ["999"]);
        expect(result).toBeNull();
    });

    it("should create a departement", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const departement = new Departement({ name: "Paris", departement_number: "75" });
        const result = await repository.create(departement);

        expect(executeQuery).toHaveBeenCalledWith("INSERT INTO departement SET ?", [departement]);
        expect(result).toBe(true);
    });

    it("should return false if create fails", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 0 });

        const departement = new Departement({ name: "Paris", departement_number: "75" });
        const result = await repository.create(departement);

        expect(executeQuery).toHaveBeenCalledWith("INSERT INTO departement SET ?", [departement]);
        expect(result).toBe(false);
    });

    it("should update a departement", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const departement = { name: "Paris (Mise à jour)" };
        const result = await repository.update(1, departement);

        expect(executeQuery).toHaveBeenCalledWith(
            "UPDATE departement SET ? WHERE id = ?",
            [departement, 1]
        );
        expect(result).toBe(true);
    });

    it("should return false if update fails", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 0 });

        const departement = { name: "Paris (Mise à jour)" };
        const result = await repository.update(999, departement);

        expect(executeQuery).toHaveBeenCalledWith(
            "UPDATE departement SET ? WHERE id = ?",
            [departement, 999]
        );
        expect(result).toBe(false);
    });

    it("should delete a departement", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await repository.delete(1);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM departement WHERE id = ?", [1]);
        expect(result).toBe(true);
    });

    it("should return false if delete fails", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 0 });

        const result = await repository.delete(999);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM departement WHERE id = ?", [999]);
        expect(result).toBe(false);
    });

    it("should handle errors from executeQuery", async () => {
        const error = new Error("Database error");
        (executeQuery as jest.Mock).mockRejectedValue(error);

        await expect(repository.getAll()).rejects.toThrow("Database error");
        await expect(repository.getById(1)).rejects.toThrow("Database error");
        await expect(repository.getByDepartementNumber("75")).rejects.toThrow("Database error");
        await expect(repository.create({ name: "Paris" })).rejects.toThrow("Database error");
        await expect(repository.update(1, { name: "Paris" })).rejects.toThrow("Database error");
        await expect(repository.delete(1)).rejects.toThrow("Database error");
    });
});