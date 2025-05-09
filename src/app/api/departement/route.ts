import { NextRequest } from "next/server";
import DepartementController from "../controllers/DepartementController";

const departementController = new DepartementController();

export async function GET(req: NextRequest) {
    try {
        return await departementController.getAll(req);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        if (!body.name || !body.departement_number) {
            return new Response(JSON.stringify({ message: "Invalid or incomplete data." }), { status: 400 });
        }
        return await departementController.create(req, body);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}