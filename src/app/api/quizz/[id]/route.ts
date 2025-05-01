import { NextRequest } from "next/server";
import QuizzController from "../../controllers/QuizzController";

const quizzController = new QuizzController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        return await quizzController.getById(req, id);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        const body = await req.json();
        return await quizzController.update(req, id, body);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        return await quizzController.delete(req, id);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}