import { NextResponse } from "next/server";
import AvatarController from "../controllers/AvatarController";

const avatarController = new AvatarController();

export async function GET(): Promise<NextResponse> {
    return avatarController.getAll();
}