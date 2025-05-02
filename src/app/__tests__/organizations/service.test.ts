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
            new kt_organizations({ id: 1, name: "Org 1", email: "org1@example.com" }),
            new kt_organizations({ id: 2, name: "Org 2", email: "org2@example.com" }),
        ];
        repository.getAll.mockResolvedValue(mockOrganizations);

        const result = await service.getAll();

        expect(repository.getAll).toHaveBeenCalled();
        expect(result).toHaveLength(2);
        expect(result[0]).toBeInstanceOf(kt_organizations);
    });

    it("should retrieve an organization by ID", async () => {
        const mockOrganization = new kt_organizations({ id: 1, name: "Org 1", email: "org1@example.com" });
        repository.getById.mockResolvedValue(mockOrganization);

        const result = await service.getById(1);

        expect(repository.getById).toHaveBeenCalledWith(1);
        expect(result).toBeInstanceOf(kt_organizations);
    });

    it("should throw an error for invalid ID in getById", async () => {
        await expect(service.getById(NaN)).rejects.toThrow("Invalid organization ID");
    });

    it("should create an organization", async () => {
        repository.create.mockResolvedValue(true);

        const organization = new kt_organizations({ name: "Org 1", email: "org1@example.com" });
        const result = await service.create(organization);

        expect(repository.create).toHaveBeenCalledWith(organization);
        expect(result).toBe(true);
    });

    it("should update an organization", async () => {
        repository.update.mockResolvedValue(true);

        const result = await service.update(1, { name: "Updated Org" });

        expect(repository.update).toHaveBeenCalledWith(1, { name: "Updated Org" });
        expect(result).toBe(true);
    });

    it("should delete an organization", async () => {
        repository.delete.mockResolvedValue(true);

        const result = await service.delete(1);

        expect(repository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});