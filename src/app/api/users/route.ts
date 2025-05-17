import UsersController from "../controllers/UsersController";

const usersController = new UsersController();

export async function GET() {
    return usersController.getAll();
}