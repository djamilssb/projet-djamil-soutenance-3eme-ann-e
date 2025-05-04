import kt_organizationsService from "@/app/api/services/OrganizationsService";
import OrganizationRepository from "@/app/api/repositories/OrganizationsRepository";
import kt_organizations from "@/app/api/models/Organizations";

jest.mock("@/app/api/repositories/OrganizationsRepository");

describe("kt_organizationsService", () => {
    let service: kt_organizationsService;
    let repository: jest.Mocked<OrganizationRepository>;

    beforeEach(() => {
        repository = new OrganizationRepository() as jest.Mocked<OrganizationRepository>;
        service = new kt_organizationsService();
        (service as any).organizationRepository = repository;
        jest.clearAllMocks();
    });

    it("should retrieve all organizations", async () => {
        const mockOrganizations = [
            new kt_organizations({
                id: 1,
                name: "Org 1",
                email: "org1@example.com",
                phone_number: "123456789",
                about_us: "About Org 1",
                created_at: new Date("2023-01-01"),
            }),
            new kt_organizations({
                id: 2,
                name: "Org 2",
                email: "org2@example.com",
                phone_number: "987654321",
                about_us: "About Org 2",
                created_at: new Date("2023-02-01"),
            }),
        ];
        repository.getAll.mockResolvedValue(mockOrganizations);

        const result = await service.getAll();

        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(kt_organizations);
        expect(result[0].getPhoneNumber()).toBe("123456789");
        expect(result[0].getAboutUs()).toBe("About Org 1");
        expect(result[0].getCreatedAt()).toEqual(new Date("2023-01-01"));
    });

    it("should retrieve an organization by ID", async () => {
        const mockOrganization = new kt_organizations({
            id: 1,
            name: "Org 1",
            email: "org1@example.com",
            phone_number: "123456789",
            about_us: "About Org 1",
            created_at: new Date("2023-01-01"),
        });
        repository.getById.mockResolvedValue(mockOrganization);

        const result = await service.getById(1);

        expect(repository.getById).toHaveBeenCalledWith(1);
        expect(result).toBeInstanceOf(kt_organizations);
        expect(result?.getPhoneNumber()).toBe("123456789");
        expect(result?.getAboutUs()).toBe("About Org 1");
        expect(result?.getCreatedAt()).toEqual(new Date("2023-01-01"));
    });

    it("should throw an error for invalid ID in getById", async () => {
        await expect(service.getById(NaN)).rejects.toThrow("Invalid organization ID");
    });

    it("should create an organization", async () => {
        repository.create.mockResolvedValue(true);

        const organization = new kt_organizations({
            name: "Org 1",
            email: "org1@example.com",
            phone_number: "123456789",
            about_us: "About Org 1",
            created_at: new Date("2023-01-01"),
        });
        const result = await service.create(organization);

        expect(repository.create).toHaveBeenCalledWith(organization);
        expect(result).toBe(true);
    });

    it("should update an organization", async () => {
        repository.update.mockResolvedValue(true);

        const updatedData = {
            name: "Updated Org",
            phone_number: "987654321",
            about_us: "Updated About Org",
        };
        const result = await service.update(1, updatedData);

        expect(repository.update).toHaveBeenCalledWith(1, updatedData);
        expect(result).toBe(true);
    });

    it("should delete an organization", async () => {
        repository.delete.mockResolvedValue(true);

        const result = await service.delete(1);

        expect(repository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});