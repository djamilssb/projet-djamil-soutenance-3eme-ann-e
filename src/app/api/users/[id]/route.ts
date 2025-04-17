import { NextRequest } from "next/server";
import UsersController from "../../controllers/UsersController";

const usersController = new UsersController();

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const userId = parseInt(id, 10);

    return await usersController.getUserById(req, userId);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const userId = parseInt(id);
    const newData = await req.json();

    return await usersController.updateUser(req, userId, newData);
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const userId = parseInt(id, 10);

    return await usersController.deleteUser(req, userId);
}