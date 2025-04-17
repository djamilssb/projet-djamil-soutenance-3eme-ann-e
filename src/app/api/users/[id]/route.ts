import { NextRequest } from "next/server";
import UsersController from "../../controllers/UsersController";

const usersController = new UsersController();

export async function GET(req: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    return await usersController.getUserById(req, numericId);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
    const { id } = await context.params;
    const idUser = parseInt(id);
    const newData = await req.json();

    return await usersController.updateUser(req, idUser, newData);
}

export async function DELETE(req: NextRequest, context: { params: {id: string}}) {
    const { id } = await context.params;
    const numericId = parseInt(id, 10);

    return await usersController.deleteUser(req, numericId);
}