import { NextRequest } from "next/server";
import AuthController from "../../controllers/AuthController";
import Auth from "../../models/Auth";

const authController = new AuthController();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const authData = new Auth(body);
    return await authController.signIn(authData);
};