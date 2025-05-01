import { NextRequest } from "next/server";
import QuizzController from "../../controllers/QuizzController";

const quizzController = new QuizzController();

export async function GET(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
    try {
        const userId = parseInt((await context.params).userId, 10);
        if (isNaN(userId)) {
            return new Response(JSON.stringify({ message: "Invalid user ID." }), { status: 400 });
        }
        return await quizzController.getByUserId(req, userId);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}