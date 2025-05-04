import { NextRequest, NextResponse } from "next/server";
import UsersService from "../services/UsersService";
import Users from "../models/Users";

class UsersController {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    public async getAllUsers(req: NextRequest): Promise<NextResponse> {
        try {
            const users = await this.usersService.getAll();
            return NextResponse.json(users, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all users:', error);
            return NextResponse.json({ message: 'Failed to retrieve users.' }, { status: 500 });
        }
    }

    public async getUserById(req: NextRequest, id: number): Promise<NextResponse> {
        const userId: number = id;

        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID.' }, { status: 400 });
        }

        try {
            const user = await this.usersService.getById(userId);
            if (!user) {
                return NextResponse.json({ message: 'User not found.' }, { status: 404 });
            }
            return NextResponse.json(user, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve user by ID:', error);
            return NextResponse.json({ message: 'Failed to retrieve the user.' }, { status: 500 });
        }
    }

    public async updateUser(req: NextRequest, id: number, newData: Partial<Users>): Promise<NextResponse> {
        const userId = id;
        const userData = newData;

        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID.' }, { status: 400 });
        }

        try {
            const updated = await this.usersService.update(userId, userData);
            if (!updated) {
                return NextResponse.json({ message: 'Failed to update the user.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'User successfully updated.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to update user:', error);
            return NextResponse.json({ message: 'Failed to update the user.' }, { status: 500 });
        }
    }

    public async deleteUser(req: NextRequest, id: number): Promise<NextResponse> {
        const userId: number = id;

        if (isNaN(userId)) {
            return NextResponse.json({ message: 'Invalid user ID.' }, { status: 400 });
        }

        try {
            const deleted = await this.usersService.delete(userId);
            if (!deleted) {
                return NextResponse.json({ message: 'Failed to delete the user.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'User successfully deleted.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to delete user:', error);
            return NextResponse.json({ message: 'Failed to delete the user.' }, { status: 500 });
        }
    }
}

export default UsersController;