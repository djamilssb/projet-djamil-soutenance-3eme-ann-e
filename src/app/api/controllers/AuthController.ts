import AuthService from "../services/AuthService";
import { NextResponse } from "next/server";
import Auth from "../models/Auth";
import Users from "../models/Users";

class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    };

    public async signIn(body: Auth): Promise<NextResponse> {
        try {
            const result = await this.authService.signIn(body);
    
            if (result) {
                const response = NextResponse.json(
                    {
                        message: "Authentication successful",
                        id: result.id,
                        role: result.role,
                    },
                    { status: 200 }
                );
    
                response.cookies.set("token", result.token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 3 * 60 * 60,
                });
    
                return response;
            } else {
                return NextResponse.json(
                    { message: "Invalid credentials" },
                    { status: 401 }
                );
            };
        } catch (error) {
            console.error("Failed to sign in:", error);
            return NextResponse.json(
                { message: "An error occurred during authentication" },
                { status: 500 }
            );
        };
    };

    public async signUp(body: Partial<Users>): Promise<NextResponse> {
        const userData: Partial<Users> = body;
        console.log('begin signup')
        if (!userData.username || !userData.password || !userData.email || !userData.phone || !userData.address) {
            console.log('signup in return')
            return NextResponse.json({ message: "Missing user data." }, { status: 400 });
        }

        try {
            const created = await this.authService.signUp(userData);
            console.log('try block in signup', created)

            if (!created) {
                return NextResponse.json({ message: "Failed to create the user." }, { status: 400 });
            }
            return NextResponse.json({ message: "User create successful." }, { status: 201 });
        } catch (error) {
            console.error("Failed to create user:", error);
            return NextResponse.json({ message: "Failed to create the user." }, { status: 500 });
        };
    };

    public async getUserIdByToken(token: string): Promise<NextResponse> {
        try {
            const userId = await this.authService.getUserIdByToken(token);

            if (!userId) {
                return NextResponse.json({ message: "Invalid token." }, { status: 401 });
            }

            return NextResponse.json({ id: userId }, { status: 200 });
        } catch (error) {
            console.error("Failed to get user ID by token:", error);
            return NextResponse.json({ message: "An error occurred while retrieving the user ID." }, { status: 500 });
        }
    }
};

export default AuthController;