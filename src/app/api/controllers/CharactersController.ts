import { NextRequest, NextResponse } from "next/server";
import CharactersService from "../services/CharactersService";
import Character from "../models/Characters";

class CharactersController {
    private charactersService: CharactersService;

    constructor() {
        this.charactersService = new CharactersService();
    }

    public async getAllCharacters(req: NextRequest): Promise<NextResponse> {
        try {
            const characters = await this.charactersService.getAll();
            return NextResponse.json(characters, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all characters:', error);
            return NextResponse.json({ message: 'Failed to retrieve characters.' }, { status: 500 });
        }
    }

    public async getCharacterById(req: NextRequest, id: number): Promise<NextResponse> {
        const characterId = id;

        if (isNaN(characterId)) {
            return NextResponse.json({ message: 'Invalid character ID.' }, { status: 400 });
        }

        try {
            const character = await this.charactersService.getById(characterId);
            if (!character) {
                return NextResponse.json({ message: 'Character not found.' }, { status: 404 });
            }
            return NextResponse.json(character, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve character by ID:', error);
            return NextResponse.json({ message: 'Failed to retrieve the character.' }, { status: 500 });
        }
    }

    public async createCharacter(req: NextRequest, body: Partial<Character>): Promise<NextResponse> {
        const characterData = body;

        if (!characterData.name || !characterData.image_url) {
            return NextResponse.json({ message: 'Missing character data.' }, { status: 400 });
        }

        try {
            const created = await this.charactersService.create(characterData);

            if (!created) {
                return NextResponse.json({ message: 'Failed to create the character.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Character successfully created.' }, { status: 201 });
        } catch (error) {
            console.error('Failed to create character:', error);
            return NextResponse.json({ message: 'Failed to create the character.' }, { status: 500 });
        }
    }

    public async updateCharacter(req: NextRequest, id: number, newData: Partial<Character>): Promise<NextResponse> {
        const characterId = id;

        if (isNaN(characterId)) {
            return NextResponse.json({ message: 'Invalid character ID.' }, { status: 400 });
        }

        try {
            const updated = await this.charactersService.update(characterId, newData);
            if (!updated) {
                return NextResponse.json({ message: 'Failed to update the character.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Character successfully updated.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to update character:', error);
            return NextResponse.json({ message: 'Failed to update the character.' }, { status: 500 });
        }
    }

    public async deleteCharacter(req: NextRequest, id: number): Promise<NextResponse> {
        const characterId = id;

        if (isNaN(characterId)) {
            return NextResponse.json({ message: 'Invalid character ID.' }, { status: 400 });
        }

        try {
            const deleted = await this.charactersService.delete(characterId);
            if (!deleted) {
                return NextResponse.json({ message: 'Failed to delete the character.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Character successfully deleted.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to delete character:', error);
            return NextResponse.json({ message: 'Failed to delete the character.' }, { status: 500 });
        }
    }
}

export default CharactersController;
