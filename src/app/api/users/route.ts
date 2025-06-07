import { NextResponse } from "next/server";
import UsersController from "../controllers/UsersController";

const usersController = new UsersController();

export async function GET(): Promise<NextResponse> {
    return usersController.getAll();
}