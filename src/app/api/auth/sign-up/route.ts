import { NextRequest } from "next/server";
import AuthController from "../../controllers/AuthController";

const authController = new AuthController();

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newUser = body;
  
    return await authController.signUp(newUser);
  }