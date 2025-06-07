import { NextRequest } from "next/server";
import SaveQuizzController from "../../controllers/SaveQuizzController";

const saveQuizzController = new SaveQuizzController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const quizzId = parseInt(id, 10);

    return await saveQuizzController.getById(req, quizzId);
};

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const quizzId = parseInt(id, 10);
    const newData = await req.json();

    return await saveQuizzController.update(req, quizzId, newData);
};

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const quizzId = parseInt(id, 10);

    return await saveQuizzController.delete(req, quizzId);
};