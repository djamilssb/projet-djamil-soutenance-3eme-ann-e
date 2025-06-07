import { NextRequest, NextResponse } from "next/server";
import AnswerController from "@/app/api/controllers/AnswerController";

const answerController = new AnswerController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        return await answerController.getAnswersByQuestion(req, id);
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}