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
};

export default AvatarController;