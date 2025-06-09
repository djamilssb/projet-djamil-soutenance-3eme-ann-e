import { NextRequest, NextResponse } from "next/server";
import QuizzController from "../../controllers/QuizzController";

const quizzController = new QuizzController();

export async function GET(context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        return await quizzController.getById(id);
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Internal server error: " + error }), { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        const body = await req.json();
        return await quizzController.update(id, body);
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Internal server error: " + error }), { status: 500 });
    }
}

export async function DELETE(context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        return await quizzController.delete(id);
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Internal server error: " + error }), { status: 500 });
    }
}