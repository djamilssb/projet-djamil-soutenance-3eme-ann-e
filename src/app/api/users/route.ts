import { NextRequest } from "next/server";
import UsersController from "../controllers/UsersController";

const usersController = new UsersController();

export async function GET(req: NextRequest) {
    return usersController.getAllUsers(req);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newUser = body;
  
    return await usersController.createUser(req, newUser);
  }