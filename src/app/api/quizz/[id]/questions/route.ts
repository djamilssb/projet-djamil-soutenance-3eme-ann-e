import { NextRequest, NextResponse } from "next/server";
import QuestionController from "@/app/api/controllers/QuestionController";

const qController = new QuestionController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await context.params).id, 10);
        if (isNaN(id)) {
            return new Response(JSON.stringify({ message: "Invalid ID." }), { status: 400 });
        }
        return await qController.getQuestionsByQuizz(req, id);
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "Internal server error: " + error }), { status: 500 });
    }
}