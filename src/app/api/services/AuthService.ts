import Auth from "../models/Auth";
import Users from "../models/Users";
import AuthRepository from "../repositories/AuthRepository";
import bcrypt from "bcrypt";

class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    public async signIn(data: Auth): Promise<boolean> {
        const user = await this.authRepository.getUserByEmail(data.getEmail());

        if (!user) {
            throw new Error("Invalid credentials");
        }

        if (data.getPassword()) {
            const isValidPassword = await bcrypt.compare(data.getPassword()!, user.password!);
            if (isValidPassword) return true;
        }

        if (data.getPasswordKids()) {
            const isValidKidsPassword = await bcrypt.compare(data.getPasswordKids()!, user.password_kids!);
            if (isValidKidsPassword) return true;
        }

        return false;
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