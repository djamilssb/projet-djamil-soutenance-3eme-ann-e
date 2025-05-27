import { NextRequest, NextResponse } from "next/server";
import UsersController from "../../controllers/UsersController";

const usersController = new UsersController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const { id } = await context.params;
    const userId = parseInt(id, 10);

    return await usersController.getById(userId);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const { id } = await context.params;
    const userId = parseInt(id, 10);
    const newData = await req.json();

    return await usersController.update(userId, newData);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }): Promise<NextResponse> {
    const { id } = await context.params;
    const userId = parseInt(id, 10);

    return await usersController.delete(userId);
}