import executeQuery from "@/utils/executeQuery";
import kt_organizations from "../models/Organizations";

class kt_OrganizationRepository {
  constructor() {}

  public async getAll(): Promise<kt_organizations[]> {
    const rows = await executeQuery("SELECT * FROM kt_organizations", []);
    return rows.map((row: object) => new kt_organizations(row));
  }

  public async getById(id: number): Promise<kt_organizations | null> {
    const row = await executeQuery("SELECT * FROM kt_organizations WHERE id = ?", [id]);
    if (row.length === 0) return null;
    return new kt_organizations(row[0]);
  }

  public async create(kt_organization: Partial<kt_organizations>): Promise<boolean> {
    const newOrganization = kt_organization;
    const result = await executeQuery("INSERT INTO kt_organizations SET ?", [newOrganization]);
    return result.affectedRows > 0;
  }

  public async update(id: number, organization: Partial<kt_organizations>): Promise<boolean> {
    const organizationId = id;
    const updatedOrganization = organization;
    const result = await executeQuery("UPDATE kt_organizations SET ? WHERE id = ?", [
      updatedOrganization,
      organizationId,
    ]);
    return result.affectedRows > 0;
  }

  public async delete(id: number): Promise<boolean> {
    const result = await executeQuery("DELETE FROM kt_organizations WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

export default kt_OrganizationRepository;
