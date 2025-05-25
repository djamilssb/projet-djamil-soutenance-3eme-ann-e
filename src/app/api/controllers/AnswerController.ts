import { NextRequest, NextResponse } from "next/server";
import AnswerService from "../services/AnswerService";
import Answer from "../models/Answer";

class AnswerController {

    private answerService: AnswerService;

    constructor() {
        this.answerService = new AnswerService();
    }

    public async getAllAnswers(req: NextRequest): Promise<NextResponse> {
        try {
            const answers = await this.answerService.getAll();
            return NextResponse.json(answers, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all answers:', error);
            return NextResponse.json({ message: 'Impossible de récupérer les réponses.' }, { status: 500 });
        }
    }

    public async getAnswerById(req: NextRequest, id: number): Promise<NextResponse> {
        const answerId: number = id;

        if (isNaN(answerId)) {
            return NextResponse.json({ message: 'ID réponse invalide.' }, { status: 400 });
        }

        try {
            const answer = await this.answerService.getById(answerId);
            if (!answer) {
                return NextResponse.json({ message: 'Réponse introuvable.' }, { status: 404 });
            }
            return NextResponse.json(answer, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve answer by ID:', error);
            return NextResponse.json({ message: 'Impossible de récupérer la réponse.' }, { status: 500 });
        }
    }

    public async createAnswer(req: NextRequest, body: Partial<Answer>): Promise<NextResponse> {
        const answerData: Partial<Answer> = body;
        console.log('answer', answerData);

        if (!answerData.id_quizz || !answerData.id_question || !answerData.content) {
            console.log('not all data');
            return NextResponse.json({ message: 'Données de réponse manquantes.' }, { status: 400 });
        }

        try {
            const createdResult = await this.answerService.create(answerData);
            if (!createdResult) {
                console.log('not created', createdResult);
                return NextResponse.json({ message: 'Échec de la création de la réponse.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Réponse créé avec succès.' }, { status: 201 });
        } catch (error) {
            console.error('Failed to create answer:', error);
            return NextResponse.json({ message: 'Impossible de créer la réponse.' }, { status: 500 });
        }
    }

    public async updateAnswer(req: NextRequest, id: number, newData: Partial<Answer>): Promise<NextResponse> {
        const answerId = id;
        const answerData = newData;

        if (isNaN(answerId)) {
            return NextResponse.json({ message: 'ID réponse invalide.' }, { status: 400 });
        }

        try {
            const updatedResult = await this.answerService.update(answerId, answerData);
            if (!updatedResult) {
                return NextResponse.json({ message: 'Échec de la mise à jour de la réponse.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Réponse mis à jour avec succès.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to update answer:', error);
            return NextResponse.json({ message: 'Impossible de mettre à jour la réponse.' }, { status: 500 });
        }
    }

    public async deleteAnswer(req: NextRequest, id: number): Promise<NextResponse> {
        const answerId: number = id;
        
        if (isNaN(answerId)) {
            return NextResponse.json({ message: 'ID réponse invalide.' }, { status: 400 });
        }

        try {
            const deletedResult = await this.answerService.delete(answerId);
            if (!deletedResult) {
                return NextResponse.json({ message: 'Échec de la suppression de la réponse.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Réponse supprimé avec succès.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to delete réponse:', error);
            return NextResponse.json({ message: 'Impossible de supprimer la réponse.' }, { status: 500 });
        }
    }

    public async getAnswersByQuizz(req: NextRequest, id: number): Promise<NextResponse> {
        const quizzId: number = id;

        if (isNaN(quizzId)) {
            return NextResponse.json({ message: 'ID quizz invalide.' }, { status: 400 });
        }

        try {
            const answers = await this.answerService.getAnswersByQuizz(quizzId);
            return NextResponse.json(answers, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all answers:', error);
            return NextResponse.json({ message: 'Impossible de récupérer les réponses.' }, { status: 500 });
        }
    }

    public async getAnswersByQuestion(req: NextRequest, id: number): Promise<NextResponse> {
        const questionId: number = id;

        if (isNaN(questionId)) {
            return NextResponse.json({ message: 'ID question invalide.' }, { status: 400 });
        }

        try {
            const answers = await this.answerService.getAnswersByQuestion(questionId);
            return NextResponse.json(answers, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all answers:', error);
            return NextResponse.json({ message: 'Impossible de récupérer les réponses.' }, { status: 500 });
        }
    }
}

export default AnswerController;