import { NextRequest, NextResponse } from "next/server";
import AuthController from "../../controllers/AuthController";

const authController = new AuthController();

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }), { status: 401 };
    }

    return await authController.getUserIdByToken(token);
}