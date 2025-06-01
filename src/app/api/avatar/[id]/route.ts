import { NextRequest, NextResponse } from "next/server";
import AvatarController from "../../controllers/AvatarController";

const avatarController = new AvatarController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const { id } = await context.params;
    const avatarId = parseInt(id, 10);

    return await avatarController.getById(avatarId);
}