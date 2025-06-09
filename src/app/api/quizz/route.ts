import { NextRequest } from "next/server";
import QuizzController from "../controllers/QuizzController";

const quizzController = new QuizzController();

export async function GET(req: NextRequest) {
    try {
        // Extraire les paramètres de l'URL
        const url = new URL(req.url);
        const userIdParam = url.searchParams.get('userId');
        const idUserNullParam = url.searchParams.get('idUserNull');
        
        // Si idUserNull est demandé, récupérer les quiz génériques (id_user = NULL)
        if (idUserNullParam === '1') {
            return await quizzController.getAll(req); 
        }
        
        // Si userId est fourni, appeler getAllQuizByIdUser
        if (userIdParam) {
            return await quizzController.getAllQuizByIdUser(req);
        }
        
        // Sinon, appeler getAll pour tous les quiz
        return await quizzController.getAll(req);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error:" + error }), { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        return await quizzController.create(body);
    } catch (error) {
        return new Response(JSON.stringify({ message: "Internal server error: " + error }), { status: 500 });
    }
}