import UsersRepository from "@/app/api/repositories/UsersRepository";
import Users from "@/app/api/models/Users";
import executeQuery from "@/utils/executeQuery";
jest.mock("@/utils/executeQuery");

describe("UsersRepository", () => {
    let usersRepository: UsersRepository;

    beforeEach(() => {
        usersRepository = new UsersRepository();
        jest.clearAllMocks();
    });

    it("should retrieve all users", async () => {
        const mockData = [
            { id: 1, username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "test@example.com" },
            { id: 2, username: "testuser2", password: "passwordtest2", password_kids: "passwordtest2", email: "test2@example.com" },
        ];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const users = await usersRepository.getAll();

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_users", []);
        expect(users).toHaveLength(2);
        expect(users[0]).toBeInstanceOf(Users);
        expect(users[0].getUsername()).toBe("testuser");
    });

    it("should retrieve a user by ID", async () => {
        const mockData = [{ id: 1, username: "testuser", password: "passwordtest", password_kids: "passwordtest", email: "test@example.com" }];
        (executeQuery as jest.Mock).mockResolvedValue(mockData);

        const user = await usersRepository.getById(1);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_users WHERE id = ?", [1]);
        expect(user).toBeInstanceOf(Users);
        expect(user?.getUsername()).toBe("testuser");
    });

    it("should return null if user is not found", async () => {
        (executeQuery as jest.Mock).mockResolvedValue([]);

        const user = await usersRepository.getById(999);

        expect(executeQuery).toHaveBeenCalledWith("SELECT * FROM kt_users WHERE id = ?", [999]);
        expect(user).toBeNull();
    });

    it("should update a user", async () => {

        const mockUser = new Users({ id: 1, username: "updateduser", password: "passwordtest", password_kids: "passwordtest", email: "eee@ee.fr"});
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await usersRepository.update(mockUser.getId()!, mockUser);

        expect(executeQuery).toHaveBeenCalledWith("UPDATE kt_users SET ? WHERE id = ?", [mockUser, 1]);
        expect(result).toBe(true);
    });

    it("should delete a user", async () => {
        (executeQuery as jest.Mock).mockResolvedValue({ affectedRows: 1 });

        const result = await usersRepository.delete(1);

        expect(executeQuery).toHaveBeenCalledWith("DELETE FROM kt_users WHERE id = ?", [1]);
        expect(result).toBe(true);
    });
});