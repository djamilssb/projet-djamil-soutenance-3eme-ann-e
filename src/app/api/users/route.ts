import { NextRequest } from "next/server";
import UsersController from "../controllers/UsersController";

const usersController = new UsersController();

export async function GET(req: NextRequest) {
    return usersController.getAllUsers(req);
}