import { NextRequest } from "next/server";
import QuestionController from "../../controllers/QuestionController";

const questionController = new QuestionController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const questionId = parseInt(id, 10);

    return await questionController.getQuestionById(req, questionId);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const questionId = parseInt(id, 10);
    const newData = await req.json();

    return await questionController.updateQuestion(req, questionId, newData);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const questionId = parseInt(id, 10);

    return await questionController.deleteQuestion(req, questionId);
}