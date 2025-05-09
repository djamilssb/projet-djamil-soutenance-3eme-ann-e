import { NextRequest } from "next/server";
import QuizzController from "../controllers/QuizzController";

const quizzController = new QuizzController();

export async function GET(req: NextRequest) {
    try {
        return await quizzController.getAll(req);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        return await quizzController.create(req, body);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}