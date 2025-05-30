import { NextRequest } from "next/server";
import AuthController from "../../controllers/AuthController";

const authController = new AuthController();

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    return await authController.getUserIdByToken(token);
}