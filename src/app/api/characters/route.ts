import { NextRequest } from "next/server";
import CharactersController from "../controllers/CharactersController";

const charactersController = new CharactersController();

export async function GET(req: NextRequest) {
  return charactersController.getAllCharacters(req);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newCharacter = body;

  return await charactersController.createCharacter(req, newCharacter);
}
