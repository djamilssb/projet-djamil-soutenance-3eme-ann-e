import { NextRequest } from "next/server";
import CharactersController from "../../controllers/CharactersController";

const charactersController = new CharactersController();

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const characterId = parseInt(id, 10);

    return await charactersController.getCharacterById(req, characterId);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const characterId = parseInt(id, 10);
    const newData = await req.json();

    return await charactersController.updateCharacter(req, characterId, newData);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const id = await context.params.then((res) => res.id);
    const characterId = parseInt(id, 10);

    return await charactersController.deleteCharacter(req, characterId);
}
