import { NextRequest } from "next/server";
import DepartementController from "../../controllers/DepartementController";

const departementController = new DepartementController();

export async function GET(req: NextRequest, context: { params: Promise<{ number: string }> }) {
    try {
        const number = (await context.params).number;
        if (!number) {
            return new Response(JSON.stringify({ message: "Invalid department number." }), { status: 400 });
        }
        return await departementController.getByNumber(req, number);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}