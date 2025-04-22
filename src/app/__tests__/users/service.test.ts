import UsersService from "@/app/api/services/UsersService";
import UsersRepository from "@/app/api/repositories/UsersRepository";
import Users from "@/app/api/models/Users";

jest.mock("@/app/api/repositories/UsersRepository");

describe("UsersService", () => {
    let usersService: UsersService;
    let usersRepository: jest.Mocked<UsersRepository>;

    beforeEach(() => {
        usersRepository = new UsersRepository() as jest.Mocked<UsersRepository>;
        usersService = new UsersService();
        (usersService as any).userRepository = usersRepository;
        jest.clearAllMocks();
    });

    it("should retrieve all users", async () => {
        const mockUsers = [
            new Users({ id: 1, username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "test@example.com" }),
            new Users({ id: 2, username: "testuser2", password: "passwordtest2", password_kids: "passwordtest2", email: "test2@example.com" }),
        ];
        usersRepository.getAll.mockResolvedValue(mockUsers);

        const users = await usersService.getAll();

        expect(usersRepository.getAll).toHaveBeenCalled();
        expect(users).toHaveLength(2);
        expect(users[0].getUsername()).toBe("testuser");
    });

    it("should retrieve a user by ID", async () => {
        const mockUser = new Users({ id: 1, username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "test@example.com" });
        usersRepository.getById.mockResolvedValue(mockUser);

        const user = await usersService.getById(1);

        expect(usersRepository.getById).toHaveBeenCalledWith(1);
        expect(user?.getUsername()).toBe("testuser");
    });

    it("should create a user", async () => {
        usersRepository.create.mockResolvedValue(true);

        const result = await usersService.create({ username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "eee@frfrf.fr" });

        expect(usersRepository.create).toHaveBeenCalledWith({ username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "eee@frfrf.fr" });
        expect(result).toBe(true);
    });

    it("should update a user", async () => {
        usersRepository.update.mockResolvedValue(true);

        const result = await usersService.update(1, { username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "eee@frfrf.fr" });

        expect(usersRepository.update).toHaveBeenCalledWith(1, { username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "eee@frfrf.fr" });
        expect(result).toBe(true);
    });

    it("should delete a user", async () => {
        usersRepository.delete.mockResolvedValue(true);

        const result = await usersService.delete(1);

        expect(usersRepository.delete).toHaveBeenCalledWith(1);
        expect(result).toBe(true);
    });
});