import { NextRequest, NextResponse } from "next/server";
import UsersService from "../../services/UsersService";

const usersService = new UsersService();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const userData = await req.json();

        const updated = await usersService.update(id, userData);

        if (!updated) {
            return NextResponse.json(
                { error: "Failed to update user" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "User updated successfully" },
            { status: 200 }
        );
    } catch (e) {
        console.error("Failed to update user:", e);
        
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
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const user = await usersService.getById(id);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });
    } catch (e) {
        console.error("Failed to get user:", e);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}