import { NextRequest } from "next/server";
import SaveQuizzController from "../controllers/SaveQuizzController";

const saveQuizzController = new SaveQuizzController();

export async function GET(req: NextRequest) {
    return await saveQuizzController.getAll(req);
}

export async function POST(req: NextRequest) {
    const body = await req.json();

    return await saveQuizzController.create(req, body);
}