import Characters from "../models/Characters";
import executeQuery from "@/utils/executeQuery";

class CharacterRepository {
  constructor() {}

  public async getAll(): Promise<Characters[]> {
    const rows = await executeQuery("SELECT * FROM characters", []);
    return rows.map((row: object) => new Characters(row));
  }

  public async getById(id: number): Promise<Characters | null> {
    const row = await executeQuery("SELECT * FROM characters WHERE id = ?", [id]);
    if (row.length === 0) return null;
    return new Characters(row[0]);
  }

  public async create(character: Partial<Characters>): Promise<boolean> {
    const result = await executeQuery("INSERT INTO characters SET ?", [character]);
    return result.affectedRows > 0;
  }

  public async update(id: number, character: Partial<Characters>): Promise<boolean> {
    const result = await executeQuery("UPDATE characters SET ? WHERE id = ?", [character, id]);
    return result.affectedRows > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await executeQuery("DELETE FROM characters WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default CharacterRepository;
