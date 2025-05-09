import { NextRequest } from "next/server";
import SaveQuizzController from "../controllers/SaveQuizzController";

const saveQuizzController = new SaveQuizzController();

export async function GET(req: NextRequest) {
    try {
        return await saveQuizzController.getAll(req);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body.id_user || !body.id_quizz || !body.id_character) {
            return new Response(JSON.stringify({ message: "Invalid or incomplete data." }), { status: 400 });
        }
        return await saveQuizzController.create(req, body);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}