import UsersController from "@/app/api/controllers/UsersController";
import Users from "@/app/api/models/Users";
import UsersService from "@/app/api/services/UsersService";
import { NextRequest } from "next/server";

jest.mock("@/app/api/services/UsersService");

describe("UsersController", () => {
    let usersController: UsersController;
    let usersService: jest.Mocked<UsersService>;

    beforeEach(() => {
        
        jest.spyOn(console, "error").mockImplementation(() => {});
        
        jest.clearAllMocks();
        
        usersService = new UsersService() as jest.Mocked<UsersService>;
        usersController = new UsersController();
        usersController["usersService"] = usersService;
    });

    // GET ALL USERS
    describe("getAllUsers", () => {
        it("should return status 200 and a list of users", async () => {
            const userOne: Users = new Users({ id: 1, username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "eee@eee.fr"});
            const userTwo: Users = new Users({ id: 2, username: "testuser2", password: "passwordtest2", password_kids: "passwordtest2", email: "ee@ee.fr"});

            usersService.getAll.mockResolvedValue([userOne, userTwo]);

            const req = {} as NextRequest;
            const response = await usersController.getAllUsers(req);

            expect(usersService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual([
                userOne,
                userTwo
            ]);
        });

        it("should return status 500 if service fails", async () => {
            usersService.getAll.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await usersController.getAllUsers(req);

            expect(usersService.getAll).toHaveBeenCalled();
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to retrieve users." });
        });
    });

    // GET USER BY ID
    describe("getUserById", () => {
        it("should return status 200 and a user", async () => {
            const newUser: Users = new Users({ id: 1, username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "eee@eee.fr"})
            usersService.getById.mockResolvedValue(newUser);

            const req = {} as NextRequest;
            const response = await usersController.getUserById(req, 1);

            expect(usersService.getById).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ id: 1, username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "eee@eee.fr"});
        });

        it("should return status 404 if user is not found", async () => {
            usersService.getById.mockResolvedValue(null);

            const req = {} as NextRequest;
            const response = await usersController.getUserById(req, 999);

            expect(usersService.getById).toHaveBeenCalledWith(999);
            expect(response.status).toBe(404);
            expect(await response.json()).toEqual({ message: "User not found." });
        });

        it("should return status 400 for invalid user ID", async () => {
            const req = {} as NextRequest;
            const response = await usersController.getUserById(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid user ID." });
        });
    });

    // UPDATE USER
    describe("updateUser", () => {
        it("should return status 200 and a success message", async () => {
            usersService.update.mockResolvedValue(true);

            const req = {} as NextRequest;
            const body = { username: "updateduser" };

            const response = await usersController.updateUser(req, 1, body);

            expect(usersService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "User successfully updated." });
        });

        it("should return status 400 for invalid user ID", async () => {
            const req = {} as NextRequest;
            const body = { username: "updateduser" };

            const response = await usersController.updateUser(req, NaN, body);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid user ID." });
        });

        it("should return status 500 if service fails", async () => {
            usersService.update.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const body = { username: "updateduser" };

            const response = await usersController.updateUser(req, 1, body);

            expect(usersService.update).toHaveBeenCalledWith(1, body);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to update the user." });
        });
    });

    // DELETE USER
    describe("deleteUser", () => {
        it("should return status 200 and a success message", async () => {
            usersService.delete.mockResolvedValue(true);

            const req = {} as NextRequest;
            const response = await usersController.deleteUser(req, 1);

            expect(usersService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(200);
            expect(await response.json()).toEqual({ message: "User successfully deleted." });
        });

        it("should return status 400 for invalid user ID", async () => {
            const req = {} as NextRequest;
            const response = await usersController.deleteUser(req, NaN);

            expect(response.status).toBe(400);
            expect(await response.json()).toEqual({ message: "Invalid user ID." });
        });

        it("should return status 500 if service fails", async () => {
            usersService.delete.mockRejectedValue(new Error("Service error"));

            const req = {} as NextRequest;
            const response = await usersController.deleteUser(req, 1);

            expect(usersService.delete).toHaveBeenCalledWith(1);
            expect(response.status).toBe(500);
            expect(await response.json()).toEqual({ message: "Failed to delete the user." });
        });
    });
});