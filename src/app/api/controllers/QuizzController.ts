import { NextRequest, NextResponse } from "next/server";
import QuizzService from "../services/QuizzService";

class QuizzController {
    private quizzService: QuizzService;

    constructor() {
        this.quizzService = new QuizzService();
    }

    public async getAll(req: NextRequest): Promise<NextResponse> {
        try {
            const url = new URL(req.url);
            const idUserNullParam = url.searchParams.get('idUserNull');
            const userIdParam = url.searchParams.get('userId');
            
            // Filtrer par id_user=NULL
            if (idUserNullParam === '1') {
                const officialQuizzes = await this.quizzService.getQuizzesWhereIdUserIsNull();
                return NextResponse.json(officialQuizzes, { status: 200 });
            }
            
            // Si userId est spécifié, récupérer les quiz de cet utilisateur
            if (userIdParam) {
                const userId = parseInt(userIdParam);
                if (!isNaN(userId)) {
                    const userQuizzes = await this.quizzService.getByUserId(userId);
                    return NextResponse.json(userQuizzes, { status: 200 });
                }
            }
            
            // Sinon, récupérer tous les quiz
            const allQuizzes = await this.quizzService.getAll();
            return NextResponse.json(allQuizzes, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve quizzes:', error);
            return NextResponse.json({ message: 'Impossible de récupérer les quizz.' }, { status: 500 });
        }
    }

    public async getById(req: NextRequest, id: number): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json({ message: 'ID de quizz invalide.' }, { status: 400 });
        }

        try {
            const quizz = await this.quizzService.getById(id);
            if (!quizz) {
                return NextResponse.json({ message: 'Quizz introuvable.' }, { status: 404 });
            }
            return NextResponse.json(quizz, { status: 200 });
        } catch (error) {
            console.error(`Failed to retrieve quizz with ID ${id}:`, error);
            return NextResponse.json({ message: 'Impossible de récupérer le quizz.' }, { status: 500 });
        }
    }

    public async create(req: NextRequest, body: any): Promise<NextResponse> {
        try {
            if (!body.title || !body.id_user) {
                return NextResponse.json({ message: 'Données du quizz incomplètes.' }, { status: 400 });
            }
            
            const created = await this.quizzService.create(body);
            if (!created) {
                return NextResponse.json({ message: 'Échec de la création du quizz.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Quizz créé avec succès.', result: created }, { status: 201 });
        } catch (error) {
            console.error('Failed to create quizz:', error);
            return NextResponse.json({ message: 'Impossible de créer le quizz.' }, { status: 500 });
        }
    }

    public async update(req: NextRequest, id: number, body: any): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json({ message: 'ID de quizz invalide.' }, { status: 400 });
        }

        try {
            const updated = await this.quizzService.update(id, body);
            if (!updated) {
                return NextResponse.json({ message: 'Échec de la mise à jour du quizz.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Quizz mis à jour avec succès.' }, { status: 200 });
        } catch (error) {
            console.error(`Failed to update quizz with ID ${id}:`, error);
            return NextResponse.json({ message: 'Impossible de mettre à jour le quizz.' }, { status: 500 });
        }
    }

    public async delete(req: NextRequest, id: number): Promise<NextResponse> {
        if (!id || isNaN(id)) {
            return NextResponse.json({ message: 'ID de quizz invalide.' }, { status: 400 });
        }

        try {
            const deleted = await this.quizzService.delete(id);
            if (!deleted) {
                return NextResponse.json({ message: 'Échec de la suppression du quizz.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Quizz supprimé avec succès.' }, { status: 200 });
        } catch (error) {
            console.error(`Failed to delete quizz with ID ${id}:`, error);
            return NextResponse.json({ message: 'Impossible de supprimer le quizz.' }, { status: 500 });
        }
    }

    public async getByUserId(req: NextRequest, userId: number): Promise<NextResponse> {
        if (!userId || isNaN(userId)) {
            return NextResponse.json({ message: 'ID utilisateur invalide.' }, { status: 400 });
        }

        try {
            const quizzes = await this.quizzService.getByUserId(userId);
            return NextResponse.json(quizzes, { status: 200 });
        } catch (error) {
            console.error(`Failed to retrieve quizzes for user ${userId}:`, error);
            return NextResponse.json({ message: 'Impossible de récupérer les quizz de l\'utilisateur.' }, { status: 500 });
        }
    }

    public async getByDepartementId(req: NextRequest, departementId: number): Promise<NextResponse> {
        if (!departementId || isNaN(departementId)) {
            return NextResponse.json({ message: 'ID département invalide.' }, { status: 400 });
        }

        try {
            const quizzes = await this.quizzService.getByDepartementId(departementId);
            return NextResponse.json(quizzes, { status: 200 });
        } catch (error) {
            console.error(`Failed to retrieve quizzes for departement ${departementId}:`, error);
            return NextResponse.json({ message: 'Impossible de récupérer les quizz du département.' }, { status: 500 });
        }
    }

    public async getAllQuizByIdUser(req: NextRequest): Promise<NextResponse> {
    try {
        // Extraire les paramètres de l'URL
        const url = new URL(req.url);
        const userIdParam = url.searchParams.get('userId');
        
        // Si aucun ID utilisateur n'est fourni, retourner une erreur
        if (!userIdParam) {
            return NextResponse.json({ message: 'ID utilisateur requis.' }, { status: 400 });
        }
        
        const userId = parseInt(userIdParam);
        if (isNaN(userId)) {
            return NextResponse.json({ message: 'ID utilisateur invalide.' }, { status: 400 });
        }
        
        // Récupérer les quiz créés par cet utilisateur OU les quiz génériques (id_user NULL)
        const quizzes = await this.quizzService.getAllQuizByIdUser(userId);
        return NextResponse.json(quizzes, { status: 200 });
    } catch (error) {
        console.error('Failed to retrieve quizzes:', error);
        return NextResponse.json({ message: 'Impossible de récupérer les quizz.' }, { status: 500 });
    }
}
}

export default QuizzController;