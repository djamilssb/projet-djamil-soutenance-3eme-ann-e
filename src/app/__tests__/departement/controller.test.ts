import DepartementController from "@/app/api/controllers/DepartementController";
import DepartementService from "@/app/api/services/DepartementService";
import Departement from "@/app/api/models/Departement";
import { NextRequest } from "next/server";

jest.mock("@/app/api/services/DepartementService");

describe("DepartementController", () => {
    let departementController: DepartementController;
    let departementService: jest.Mocked<DepartementService>;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => {});
        departementService = new DepartementService() as jest.Mocked<DepartementService>;
        departementController = new DepartementController();
        departementController["departementService"] = departementService;
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    // GET ALL
    describe("getAll", () => {
        it("should return status 200 and a list of departements", async () => {
            const mockDepartements = [
                new Departement({ id: 1, name: "Paris", departement_number: "75" }),
                new Departement({ id: 2, name: "Rhône", departement_number: "69" }),
            ];
            departementService.getAll.mockResolvedValue(mockDepartements);

            const req = {} as NextRequest;
            const response = await departementController.getAll(req);

            expect(departementService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockDepartements);
        });

        it("should return status 200 and an empty array when no departements exist", async () => {
            departementService.getAll.mockResolvedValue([]);

            const req = {} as NextRequest;
            const response = await departementController.getAll(req);

            expect(departementService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual([]);
        });

        it("should return status 500 if service fails", async () => {
            departementService.getAll.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await departementController.getAll(req);

            expect(departementService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer les départements." });
        });
    });

    // GET BY ID
    describe("getById", () => {
        it("should return status 200 and a departement", async () => {
            const mockDepartement = new Departement({ id: 1, name: "Paris", departement_number: "75" });
            departementService.getById.mockResolvedValue(mockDepartement);

            const req = {} as NextRequest;
            const response = await departementController.getById(req, 1);

            expect(departementService.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockDepartement);
        });

        it("should return status 404 if departement is not found", async () => {
            departementService.getById.mockResolvedValue(null);

            const req = {} as NextRequest;
            const response = await departementController.getById(req, 999);

            expect(departementService.getById).toHaveBeenCalledWith(999);
            expect(response.status).toBe(404);
            expect(await response.json()).toEqual({ message: "Département introuvable." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const response = await departementController.getById(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID département invalide." });
        });

        it("should return status 500 if service fails", async () => {
            departementService.getById.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await departementController.getById(req, 1);

            expect(departementService.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer le département." });
        });
    });

    // GET BY NUMBER
    describe("getByNumber", () => {
        it("should return status 200 and a departement when found by number", async () => {
            const mockDepartement = new Departement({ id: 1, name: "Paris", departement_number: "75" });
            departementService.getByDepartementNumber.mockResolvedValue(mockDepartement);

            const req = {} as NextRequest;
            const response = await departementController.getByNumber(req, "75");

            expect(departementService.getByDepartementNumber).toHaveBeenCalledWith("75");
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual(mockDepartement);
        });

        it("should return status 404 if departement is not found by number", async () => {
            departementService.getByDepartementNumber.mockResolvedValue(null);

            const req = {} as NextRequest;
            const response = await departementController.getByNumber(req, "99");

            expect(departementService.getByDepartementNumber).toHaveBeenCalledWith("99");
            expect(response.status).toBe(404);
            expect(await response.json()).toEqual({ message: "Département introuvable." });
        });

        it("should return status 400 for invalid number", async () => {
            const req = {} as NextRequest;
            const response = await departementController.getByNumber(req, "");

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Numéro de département invalide." });
        });

        it("should return status 500 if service fails", async () => {
            departementService.getByDepartementNumber.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await departementController.getByNumber(req, "75");

            expect(departementService.getByDepartementNumber).toHaveBeenCalledWith("75");
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de récupérer le département." });
        });
    });

    // CREATE
    describe("create", () => {
        it("should return status 201 if departement is created", async () => {
            departementService.create.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = { name: "Paris", departement_number: "75" };
            const response = await departementController.create(req, body);

            expect(departementService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(201);
            expect(await response.json()).toEqual({ message: "Département créé avec succès." });
        });

        it("should return status 400 if creation fails", async () => {
            departementService.create.mockResolvedValue(false);

            const req = {} as NextRequest;
            const body = { name: "Paris", departement_number: "75" };
            const response = await departementController.create(req, body);

            expect(departementService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Échec de la création du département." });
        });

        it("should return status 500 if service fails", async () => {
            departementService.create.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = { name: "Paris", departement_number: "75" };
            const response = await departementController.create(req, body);

            expect(departementService.create).toHaveBeenCalledWith(body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de créer le département." });
        });
    });

    // UPDATE
    describe("update", () => {
        it("should return status 200 if departement is updated", async () => {
            departementService.update.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = { name: "Paris (Mise à jour)", departement_number: "75" };
            const response = await departementController.update(req, 1, body);

            expect(departementService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Département mis à jour avec succès." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const body = { name: "Paris", departement_number: "75" };
            const response = await departementController.update(req, NaN, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID département invalide." });
        });

        it("should return status 400 if update fails", async () => {
            departementService.update.mockResolvedValue(false);

            const req = {} as NextRequest;
            const body = { name: "Paris", departement_number: "75" };
            const response = await departementController.update(req, 1, body);

            expect(departementService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Échec de la mise à jour du département." });
        });

        it("should return status 500 if service fails", async () => {
            departementService.update.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = { name: "Paris", departement_number: "75" };
            const response = await departementController.update(req, 1, body);

            expect(departementService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de mettre à jour le département." });
        });
    });

    // DELETE
    describe("delete", () => {
        it("should return status 200 if departement is deleted", async () => {
            departementService.delete.mockResolvedValue(true);

            const req = {} as NextRequest;
            const response = await departementController.delete(req, 1);

            expect(departementService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "Département supprimé avec succès." });
        });

        it("should return status 400 for invalid ID", async () => {
            const req = {} as NextRequest;
            const response = await departementController.delete(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "ID département invalide." });
        });

        it("should return status 400 if deletion fails", async () => {
            departementService.delete.mockResolvedValue(false);

            const req = {} as NextRequest;
            const response = await departementController.delete(req, 1);

            expect(departementService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Échec de la suppression du département." });
        });

        it("should return status 500 if service fails", async () => {
            departementService.delete.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await departementController.delete(req, 1);

            expect(departementService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Impossible de supprimer le département." });
        });
    });
});