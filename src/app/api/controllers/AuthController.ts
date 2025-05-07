import { NextResponse } from "next/server";
import AuthService from "../services/AuthService";
import Auth from "../models/Auth";
import Users from "../models/Users";

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async signIn(body: Auth): Promise<NextResponse> {
        try {
            const result = await this.authService.signIn(body);

            if (result) {
                const response = NextResponse.json(
                    { message: "Authentication successful" },
                    { status: 200 }
                );

                response.cookies.set("token", result.token, {
                    httpOnly: true, // Empêche l'accès via JavaScript
                    secure: true,   // Assure que le cookie est envoyé uniquement via HTTPS
                    sameSite: "strict", // Empêche les attaques CSRF
                    maxAge: 3 * 60 * 60     // Durée de vie du cookie (en secondes)
                });
                return response;
            } else {
                return NextResponse.json(
                    { message: "Invalid credentials" },
                    { status: 401 }
                );
            }
        } catch (error) {
            console.error("Failed to sign in:", error);
            return NextResponse.json(
                { message: "An error occurred during authentication" },
                { status: 500 }
            );
        }
    }

    public async signUp(body: Partial<Users>): Promise<NextResponse> {
        const userData: Partial<Users> = body;

        if (!userData.username || !userData.password || !userData.password_kids || !userData.email) {
            return NextResponse.json({ message: "Missing user data." }, { status: 400 });
        }

        try {
            const created = await this.authService.signUp(userData);

            if (!created) {
                return NextResponse.json({ message: "Failed to create the user." }, { status: 400 });
            }
            return NextResponse.json({ message: "User create successful." }, { status: 201 });
        } catch (error) {
            console.error("Failed to create user:", error);
            return NextResponse.json({ message: "Failed to create the user." }, { status: 500 });
        }
    }
}

export default AuthController;