import { NextRequest } from "next/server";
import DepartementController from "../../controllers/DepartementController";

const departementController = new DepartementController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        return await departementController.getById(id);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error:" + error}), { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        const body = await req.json();
        return await departementController.update(id, body);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error: " + error}), { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        return await departementController.delete(id);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error: " + error }), { status: 500 });
    }
}