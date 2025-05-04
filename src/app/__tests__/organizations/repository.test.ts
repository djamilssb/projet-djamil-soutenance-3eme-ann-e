import OrganizationRepository from "@/app/api/repositories/OrganizationsRepository";
import kt_organizations from "@/app/api/models/Organizations";
import executeQuery from "@/utils/executeQuery";

jest.mock("@/utils/executeQuery");

describe("OrganizationRepository", () => {
    let organizationRepository: OrganizationRepository;

    beforeEach(() => {
        organizationRepository = new OrganizationRepository();
        jest.clearAllMocks();
    });

    it("should retrieve all organizations", async () => {
        const mockData = [
            { id: 1, name: "Org 1", email: "org1@example.com", phone_number: "123456789", about_us: "About Org 1", created_at: "2023-01-01" },
            { id: 2, name: "Org 2", email: "org2@example.com", phone_number: "987654321", about_us: "About Org 2", created_at: "2023-02-01" },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const organizations = await organizationRepository.getAll();

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_organizations", []);
        expect(organizations).toHaveLength(2);
        expect(organizations[0]).toBeInstanceOf(kt_organizations);
        expect(organizations[0].getName()).toBe("Org 1");
    });

    it("should retrieve an organization by ID", async () => {
        const mockData = [{ id: 1, name: "Org 1", email: "org1@example.com", phone_number: "123456789", about_us: "About Org 1", created_at: "2023-01-01" }];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const organization = await organizationRepository.getById(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_organizations WHERE id = ?", [1]);
        expect(organization).toBeInstanceOf(kt_organizations);
        expect(organization?.getName()).toBe("Org 1");
    });

    it("should return null if organization is not found", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const organization = await organizationRepository.getById(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_organizations WHERE id = ?", [999]);
        expect(organization).toBeNull();
    });

    it("should create an organization", async () => {
        const mockOrganization = new kt_organizations({
            name: "Org 1",
            email: "org1@example.com",
            phone_number: "123456789",
            about_us: "About Org 1",
        });

        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await organizationRepository.create(mockOrganization);

        expect(executeQuery).toHaveBeenCalledWith("INSERT INTO kt_organizations SET ?", [
            {
                name: "Org 1",
                email: "org1@example.com",
                phone_number: "123456789",
                about_us: "About Org 1",
            },
        ]);
        expect(result).toBe(true);
    });

    it("should update an organization", async () => {
        const mockOrganization = new kt_organizations({
            id: 1,
            name: "Updated Org",
            email: "updated@example.com",
            phone_number: "987654321",
            about_us: "Updated About Org",
        });

        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await organizationRepository.update(mockOrganization.getId()!, mockOrganization);

        expect(executeQuery).toHaveBeenCalledWith("UPDATE kt_organizations SET ? WHERE id = ?", [mockOrganization, 1]);
        expect(result).toBe(true);
    });

    it("should delete an organization", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await organizationRepository.delete(1);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM kt_organizations WHERE id = ?", [1]);
        expect(result).toBe(true);
    });
});