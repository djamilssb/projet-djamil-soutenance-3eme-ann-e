import { NextResponse } from "next/server";
import AvatarService from "../services/AvatarService";

class AvatarController {

    private avatarService: AvatarService;

    constructor() {
        this.avatarService = new AvatarService();
    };

    public async getAll(): Promise<NextResponse> {
        try {
            const avatars = await this.avatarService.getAll();
            return NextResponse.json(avatars, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all avatars:', error);
            return NextResponse.json([{ message: 'Failed to retrieve avatars.' }], { status: 500 });
        };
    };

    public async getById(id: number): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json({ message: "Invalid avatar ID." }, { status: 400 });
        }

        try {
            const avatar = await this.avatarService.getById(id);
            if (!avatar) {
                return NextResponse.json({ message: "Avatar not found." }, { status: 404 });
            }
            return NextResponse.json(avatar, { status: 200 });
        } catch (error) {
            console.error(`Failed to retrieve avatar with ID ${id}:`, error);
            return NextResponse.json({ message: `Failed to retrieve avatar with ID ${id}.` }, { status: 500 });
        }
    }
};

export default AvatarController;