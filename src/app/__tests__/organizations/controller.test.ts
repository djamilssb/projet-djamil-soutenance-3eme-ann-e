import kt_organizationsController from "@/app/api/controllers/OrganizationsController";
import kt_organizationsService from "@/app/api/services/OrganizationsService";
import kt_organizations from "@/app/api/models/Organizations";
import { NextRequest } from "next/server";

jest.mock("@/app/api/services/OrganizationsService");

describe("kt_organizationsController", () => {
    let controller: kt_organizationsController;
    let service: jest.Mocked<kt_organizationsService>;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
        service = new kt_organizationsService() as jest.Mocked<kt_organizationsService>;
        controller = new kt_organizationsController();
        controller["kt_organizationsService"] = service;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // GET ALL
    describe("getAllOrganizations", () => {
        it("should return status 200 and a list of organizations", async () => {
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
            service.getAll.mockResolvedValue(mockOrganizations);

            const req = {} as NextRequest;
            const response = await controller.getAllOrganizations(req);

            expect(service.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockOrganizations.map(org => ({
                id: org.id,
                name: org.name,
                email: org.email,
                phone_number: org.phone_number,
                about_us: org.about_us,
                created_at: org.created_at?.toISOString() ?? null,
            })));
        });

        it("should return status 500 if service fails", async () => {
            service.getAll.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await controller.getAllOrganizations(req);

            expect(service.getAll).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to retrieve organizations." });
        });
    });

    // GET BY ID
    describe("getOrganizationById", () => {
        it("should return status 200 and an organization", async () => {
            const mockOrganization = new kt_organizations({
                id: 1,
                name: "Org 1",
                email: "org1@example.com",
                phone_number: "123456789",
                about_us: "About Org 1",
                created_at: new Date("2023-01-01"),
            });
            service.getById.mockResolvedValue(mockOrganization);

            const req = {} as NextRequest;
            const response = await controller.getOrganizationById(req, 1);

            expect(service.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({
                ...mockOrganization,
                created_at: mockOrganization.created_at?.toISOString() ?? null,
            });
        });

        it("should return status 404 if organization is not found", async () => {
            service.getById.mockResolvedValue(null);

            const req = {} as NextRequest;
            const response = await controller.getOrganizationById(req, 999);

            expect(service.getById).toHaveBeenCalledWith(999);
            expect(response.status).toBe(404);
            expect(await response.json()).toEqual({ message: "Organization not found." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const response = await controller.getOrganizationById(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid organization ID." });
        });

        it("should return status 500 if service fails", async () => {
            service.getById.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await controller.getOrganizationById(req, 1);

            expect(service.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to retrieve the organization." });
        });
    });

    // CREATE
    describe("createOrganization", () => {
        it("should return status 201 if organization is created", async () => {
            service.create.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = new kt_organizations({
                name: "Org 1",
                email: "org1@example.com",
                phone_number: "123456789",
                about_us: "About Org 1",
                created_at: new Date("2023-01-01"),
            });
            const response = await controller.createOrganization(req, body);

            expect(service.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(201);
            expect(await response.json()).toEqual({ message: "Organization successfully created." });
        });

        it("should return status 400 for invalid data", async () => {
            const req = {} as NextRequest;
            const body = { email: "invalid@example.com" };
            const response = await controller.createOrganization(req, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Missing organization name." });
        });

        it("should return status 500 if service fails", async () => {
            service.create.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = new kt_organizations({
                name: "Org 1",
                email: "org1@example.com",
                phone_number: "123456789",
                about_us: "About Org 1",
                created_at: new Date("2023-01-01"),
            });
            const response = await controller.createOrganization(req, body);

            expect(service.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to create the organization." });
        });
    });

    // UPDATE
    describe("updateOrganization", () => {
        it("should return status 200 if organization is updated", async () => {
            service.update.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = { name: "Updated Org" };
            const response = await controller.updateOrganization(req, 1, body);

            expect(service.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Organization successfully updated." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const body = { name: "Updated Org" };
            const response = await controller.updateOrganization(req, NaN, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid organization ID." });
        });

        it("should return status 500 if service fails", async () => {
            service.update.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = { name: "Updated Org" };
            const response = await controller.updateOrganization(req, 1, body);

            expect(service.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to update the organization." });
        });
    });

    // DELETE
    describe("deleteOrganization", () => {
        it("should return status 200 if organization is deleted", async () => {
            service.delete.mockResolvedValue(true);

            const req = {} as NextRequest;
            const response = await controller.deleteOrganization(req, 1);

            expect(service.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Organization successfully deleted." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const response = await controller.deleteOrganization(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid organization ID." });
        });

        it("should return status 500 if service fails", async () => {
            service.delete.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await controller.deleteOrganization(req, 1);

            expect(service.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to delete the organization." });
        });
    });
});