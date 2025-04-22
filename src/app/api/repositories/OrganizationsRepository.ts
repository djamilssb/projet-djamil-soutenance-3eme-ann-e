import executeQuery from "@/utils/executeQuery";
import Organizations from "../models/Organizations";

class OrganizationRepository {
  constructor() {}

  public async getAll(): Promise<Organizations[]> {
    const rows = await executeQuery("SELECT * FROM Organizations", []);
    return rows.map((row: object) => new Organizations(row));
  }

  public async getById(id: number): Promise<Organizations | null> {
    const row = await executeQuery("SELECT * FROM Organizations WHERE id = ?", [id]);
    if (row.length === 0) return null;
    return new Organizations(row[0]);
  }

  public async create(organization: Partial<Organizations>): Promise<boolean> {
    const newOrganization = organization;
    const result = await executeQuery("INSERT INTO Organizations SET ?", [newOrganization]);
    return result.affectedRows > 0;
  }

  public async update(id: number, organization: Partial<Organizations>): Promise<boolean> {
    const organizationId = id;
    const updatedOrganization = organization;
    const result = await executeQuery("UPDATE Organizations SET ? WHERE id = ?", [
      updatedOrganization,
      organizationId,
    ]);
    return result.affectedRows > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await executeQuery("DELETE FROM Organizations WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default OrganizationRepository;
