import { NextRequest } from "next/server";
import AuthController from "../../controllers/AuthController";
import Auth from "../../models/Auth";

const authController = new AuthController();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const authData = new Auth(body);
    return await authController.signIn(authData);
  } catch (error) {
    console.error("Error in POST /auth:", error);
    return new Response(
      JSON.stringify({ message: "Failed to process authentication request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  };
};