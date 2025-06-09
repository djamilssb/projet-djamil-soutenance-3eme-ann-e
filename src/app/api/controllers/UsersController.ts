import { NextResponse } from "next/server";
import UsersService from "../services/UsersService";
import Users from "../models/Users";

class UsersController {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    public async getAll(): Promise<NextResponse> {
        try {
            const users = await this.usersService.getAll();
            return NextResponse.json(users, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all users:', error);
            return NextResponse.json({ message: 'Failed to retrieve users.' }, { status: 500 });
        }
    }

    public async getById(id: number): Promise<NextResponse> {
        try {

            if (isNaN(id)) {
                return NextResponse.json(
                    { error: "Invalid user ID" },
                    { status: 400 }
                );
            }

            const user = await this.usersService.getById(id);

            if (!user) {
                console.log("User not found");
                return NextResponse.json(
                    { error: "User not found" },
                    { status: 404 }
                );
            }

            console.log("User found:", { id: user.id, username: user.username, email: user.email });
            return NextResponse.json(user, { status: 200 });
        } catch (e) {
            
            return NextResponse.json(
                { error: "Internal server error", details: e instanceof Error ? e.message : 'Unknown error' },
                { status: 500 }
            );
        }
    }

    public async update(id: number, userData: Partial<Users>): Promise<NextResponse> {
        try {
            

            if (isNaN(id)) {
                return NextResponse.json(
                    { error: "Invalid user ID" },
                    { status: 400 }
                );
            }

            const updated = await this.usersService.update(id, userData);

            if (!updated) {
                console.log("Update returned false");
                return NextResponse.json(
                    { error: "Failed to update user" },
                    { status: 400 }
                );
            }

            console.log("User updated successfully");
            return NextResponse.json(
                { message: "User updated successfully" },
                { status: 200 }
            );
        } catch (e) {
            
            
            // Gérer les erreurs spécifiques de mot de passe
            if (e instanceof Error) {
                if (e.message === "invalid_current_password") {
                    return NextResponse.json(
                        { error: "invalid_current_password", message: "Le mot de passe actuel est incorrect" },
                        { status: 400 }
                    );
                }
                
                if (e.message === "invalid_current_kids_password") {
                    return NextResponse.json(
                        { error: "invalid_current_kids_password", message: "Le mot de passe enfant actuel est incorrect" },
                        { status: 400 }
                    );
                }
            }

            return NextResponse.json(
                { error: "Internal server error", details: e instanceof Error ? e.message : 'Unknown error' },
                { status: 500 }
            );
        }
    }

    public async delete(id: number): Promise<NextResponse> {
        try {
            if (isNaN(id)) {
                return NextResponse.json(
                    { error: "Invalid user ID" },
                    { status: 400 }
                );
            }

            const deleted = await this.usersService.delete(id);

            if (!deleted) {
                return NextResponse.json(
                    { error: "Failed to delete user" },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { message: "User deleted successfully" },
                { status: 200 }
            );
        } catch (e) {
            console.error("Failed to delete user:", e);
            return NextResponse.json(
                { error: "Internal server error" },
                { status: 500 }
            );
        }
    }
}

export default UsersController;