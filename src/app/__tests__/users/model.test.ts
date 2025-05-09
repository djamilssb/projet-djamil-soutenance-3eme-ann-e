import Users from "@/app/api/models/Users";

describe("Users Model", () => {
    it("should correctly initialize and return properties", () => {
        const user = new Users({
            id: 1,
            username: "testuser",
            password: "passwordtest",
            password_kids: "passwordtest",
            email: "test@example.com",
        });

        expect(user.getId()).toBe(1);
        expect(user.getUsername()).toBe("testuser");
        expect(user.getPassword()).toBe("passwordtest");
        expect(user.getPasswordKids()).toBe("passwordtest");
        expect(user.getEmail()).toBe("test@example.com");
    });
});