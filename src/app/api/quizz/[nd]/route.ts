import { NextRequest } from "next/server";
import QuizzController from "../../controllers/QuizzController";

const quizzController = new QuizzController();

export async function GET(req: NextRequest, context: { params: Promise<{ departementId: string }> }) {
    try {
        const departementId = parseInt((await context.params).departementId, 10);
        if (isNaN(departementId)) {
            return new Response(JSON.stringify({ message: "Invalid departement ID." }), { status: 400 });
        }
        return await quizzController.getByDepartementId(req, departementId);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}