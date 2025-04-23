import { NextRequest, NextResponse } from "next/server";
import SaveQuizzService from "../services/SaveQuizzService";

class SaveQuizzController {
    private saveQuizzService: SaveQuizzService;

    constructor() {
        this.saveQuizzService = new SaveQuizzService();
    }

    public async getAll(req: NextRequest): Promise<NextResponse> {
        try {
            const quizSaves = await this.saveQuizzService.getAll();
            return NextResponse.json(quizSaves.length > 0 ? quizSaves : [], { status: 200 });
        } catch (error) {
            console.error("Failed to retrieve all quiz saves:", error);
            return NextResponse.json({ message: "Failed to retrieve quiz saves." }, { status: 500 });
        }
    }

    public async getById(req: NextRequest, id: number): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json({ message: "Invalid quiz save ID." }, { status: 400 });
        }

        try {
            const quizSave = await this.saveQuizzService.getById(id);
            if (!quizSave) {
                return NextResponse.json({ message: "Quiz save not found." }, { status: 404 });
            }
            return NextResponse.json(quizSave, { status: 200 });
        } catch (error) {
            console.error(`Failed to retrieve quiz save with ID ${id}:`, error);
            return NextResponse.json({ message: `Failed to retrieve quiz save with ID ${id}.` }, { status: 500 });
        }
    }

    public async create(req: NextRequest, body: any): Promise<NextResponse> {
        const { id_user, id_quizz, id_character, ...quizSaveData } = body;
    
        if (!id_user || isNaN(id_user) || !id_quizz || isNaN(id_quizz) || !id_character || isNaN(id_character)) {
            return NextResponse.json(
                { message: "Invalid or incomplete quiz save data." },
                { status: 400 }
            );
        }
    
        try {
            const created = await this.saveQuizzService.create({
                id_user,
                id_quizz,
                id_character,
                ...quizSaveData,
            });
            if (!created) {
                return NextResponse.json(
                    { message: "Failed to create quiz save." },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { message: "Quiz save created successfully." },
                { status: 201 }
            );
        } catch (error) {
            console.error("Failed to create quiz save:", error);
            return NextResponse.json(
                { message: "Failed to create quiz save." },
                { status: 500 }
            );
        }
    }

    public async update(req: NextRequest, id: number, body: any): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json(
                { message: "Invalid quiz save ID." },
                { status: 400 }
            );
        }
    
        const { id_user, id_quizz, ...saveQuizzData } = body;
    
        if (!id_user || isNaN(id_user) || !id_quizz || isNaN(id_quizz)) {
            return NextResponse.json(
                { message: "Failed to update quiz save." },
                { status: 400 }
            );
        }
    
        try {
            const updated = await this.saveQuizzService.update(id, id_user, id_quizz, saveQuizzData);
            if (!updated) {
                return NextResponse.json(
                    { message: "Failed to update quiz save." },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { message: "Quiz save updated successfully." },
                { status: 200 }
            );
        } catch (error) {
            console.error(`Failed to update quiz save with ID ${id}:`, error);
            return NextResponse.json(
                { message: `Failed to update quiz save with ID ${id}.` },
                { status: 500 }
            );
        }
    }

    public async delete(req: NextRequest, id: number): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json({ message: "Invalid quiz save ID." }, { status: 400 });
        }

        try {
            const deleted = await this.saveQuizzService.delete(id);
            if (!deleted) {
                return NextResponse.json({ message: "Failed to delete quiz save." }, { status: 400 });
            }
            return NextResponse.json({ message: "Quiz save deleted successfully." }, { status: 200 });
        } catch (error) {
            console.error(`Failed to delete quiz save with ID ${id}:`, error);
            return NextResponse.json({ message: `Failed to delete quiz save with ID ${id}.` }, { status: 500 });
        }
    }
}

export default SaveQuizzController;