import executeQuery from "@/utils/executeQuery";
import Departement from "../models/Departement";

class DepartementRepository {
    constructor() {}

    public async getAll(): Promise<Departement[]> {
        const rows = await executeQuery("SELECT * FROM departement", []);
        return rows.map((row: object) => new Departement(row));
    }

    public async getById(id: number): Promise<Departement | null> {
        const row = await executeQuery("SELECT * FROM departement WHERE id = ?", [id]);
        if (row.length === 0) return null;
        return new Departement(row[0]);
    }

    public async getByDepartementNumber(departementNumber: string): Promise<Departement | null> {
        const row = await executeQuery("SELECT * FROM departement WHERE departement_number = ?", [departementNumber]);
        if (row.length === 0) return null;
        return new Departement(row[0]);
    }

    public async create(departement: Partial<Departement>): Promise<boolean> {
        const newDepartement = departement;
        const result = await executeQuery("INSERT INTO departement SET ?", [newDepartement]);
        return result.affectedRows > 0;
    }

    public async update(id: number, departement: Partial<Departement>): Promise<boolean> {
        const departementId = id;
        const updatedDepartement = departement;
        const result = await executeQuery("UPDATE departement SET ? WHERE id = ?", [
            updatedDepartement,
            departementId,
        ]);
        return result.affectedRows > 0;
    }

    public async delete(id: number): Promise<boolean> {
        const result = await executeQuery("DELETE FROM departement WHERE id = ?", [id]);
        return result.affectedRows > 0;
    }
}

export default DepartementRepository;