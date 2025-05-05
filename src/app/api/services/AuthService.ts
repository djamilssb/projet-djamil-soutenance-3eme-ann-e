import Auth from "../models/Auth";
import Users from "../models/Users";
import AuthRepository from "../repositories/AuthRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    public async signIn(data: Auth): Promise<{ token: string } | null> {
        const user = await this.authRepository.getUserByEmail(data.getEmail());

        if (!user) {
            throw new Error("Invalid credentials");
        }

        if (data.getPassword()) {
            const isValidPassword = await bcrypt.compare(data.getPassword()!, user.password!);
            if (isValidPassword) {
                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET!,
                    { expiresIn: "3h" }
                );
                return { token };
            }
        }

        if (data.getPasswordKids()) {
            const isValidKidsPassword = await bcrypt.compare(data.getPasswordKids()!, user.password_kids!);
            if (isValidKidsPassword) {
                const token = jwt.sign(
                    { id: user.id, isKidsAccount: true },
                    process.env.JWT_SECRET!,
                    { expiresIn: "3h" }
                );
                return { token };
            }
        }

        return null;
    }

    public async signUp(user: Partial<Users>): Promise<boolean> {
        try {
            if (!user.username?.trim() || !user.password?.trim() || !user.password_kids?.trim() || !user.email?.trim()) {
                throw new Error("Incomplete user data");
            }

            user.password = await bcrypt.hash(user.password, 14);
            user.password_kids = await bcrypt.hash(user.password_kids, 14);

            const created = await this.authRepository.signUp(user);

            if (!created) throw new Error("Error while creating the user");

            return created;
        } catch (e) {
            console.error("Error in signUp:", e);
            throw new Error("Error while creating the user");
        }
    }
}

export default AuthService;