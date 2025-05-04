import executeQuery from "@/utils/executeQuery";
import Users from "../models/Users";

class AuthRepository {
    constructor() {}

    public async getUserByEmail(email: string): Promise<Users | null> {
        try {
            const rows = await executeQuery(`
                SELECT u.email, u.password, u.password_kids
                FROM kt_users u
                WHERE u.email = ?
            `, [email]);

            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Error in getUserByEmail:", error);
            throw new Error("Database error while fetching user by email");
        }
    }

    public async signUp(user: Partial<Users>): Promise<boolean> {
        try {
            const result = await executeQuery("INSERT INTO kt_users SET ?", [user]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error in signUp:", error);
            throw new Error("Database error while creating user");
        }
    }
}

export default AuthRepository;