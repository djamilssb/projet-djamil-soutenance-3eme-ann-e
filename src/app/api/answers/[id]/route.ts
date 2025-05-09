import { NextRequest } from "next/server";
import AnswerController from "../../controllers/AnswerController";

const answerController = new AnswerController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const answerId = parseInt(id, 10);

    return await answerController.getAnswerById(req, answerId);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const answerId = parseInt(id, 10);
    const newData = await req.json();

    return await answerController.updateAnswer(req, answerId, newData);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const answerId = parseInt(id, 10);

    return await answerController.deleteAnswer(req, answerId);
}