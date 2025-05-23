import { NextRequest, NextResponse } from "next/server";
import QuestionService from "../services/QuestionService";
import Question from "../models/Question";

class QuestionController {

    private questionService: QuestionService;

    constructor() {
        this.questionService = new QuestionService();
    }

    public async getAllQuestions(req: NextRequest): Promise<NextResponse> {
        try {
            // Récupération du paramètre quizId s'il existe
            const quizId = req.nextUrl.searchParams.get("quizId");
            
            // Si quizId est fourni, utiliser getQuestionsByQuizz
            if (quizId) {
                const quizIdNumber = parseInt(quizId, 10);
                if (!isNaN(quizIdNumber)) {
                    const questions = await this.questionService.getQuestionsByQuizz(quizIdNumber);
                    return NextResponse.json(questions, { status: 200 });
                }
            }
            
            // Sinon récupérer toutes les questions
            const questions = await this.questionService.getAll();
            return NextResponse.json(questions, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve questions:', error);
            return NextResponse.json({ message: 'Impossible de récupérer les questions.' }, { status: 500 });
        }
    }

    public async getQuestionById(req: NextRequest, id: number): Promise<NextResponse> {
        const questionId: number = id;

        if (isNaN(questionId)) {
            return NextResponse.json({ message: 'ID question invalide.' }, { status: 400 });
        }

        try {
            const question = await this.questionService.getById(questionId);
            if (!question) {
                return NextResponse.json({ message: 'Question introuvable.' }, { status: 404 });
            }
            return NextResponse.json(question, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve question by ID:', error);
            return NextResponse.json({ message: 'Impossible de récupérer la question.' }, { status: 500 });
        }
    }

    public async createQuestion(req: NextRequest, body: Partial<Question>): Promise<NextResponse> {
        const questionData: Partial<Question> = body;

        if (!questionData.idQuizz || !questionData.content) {
            return NextResponse.json({ message: 'Données de questions manquantes.' }, { status: 400 });
        }

        try {
            const createdResult = await this.questionService.create(questionData);
            if (!createdResult) {
                return NextResponse.json({ message: 'Échec de la création de la question.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Question créé avec succès.' }, { status: 201 });
        } catch (error) {
            console.error('Failed to create question:', error);
            return NextResponse.json({ message: 'Impossible de créer la question.' }, { status: 500 });
        }
    }

    public async updateQuestion(req: NextRequest, id: number, newData: Partial<Question>): Promise<NextResponse> {
        const questionId = id;
        const questionData = newData;

        if (isNaN(questionId)) {
            return NextResponse.json({ message: 'ID question invalide.' }, { status: 400 });
        }

        try {
            const updatedResult = await this.questionService.update(questionId, questionData);
            if (!updatedResult) {
                return NextResponse.json({ message: 'Échec de la mise à jour de la question.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Question mis à jour avec succès.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to update question:', error);
            return NextResponse.json({ message: 'Impossible de mettre à jour la question.' }, { status: 500 });
        }
    }

    public async deleteQuestion(req: NextRequest, id: number): Promise<NextResponse> {
        const questionId: number = id;
        
        if (isNaN(questionId)) {
            return NextResponse.json({ message: 'ID question invalide.' }, { status: 400 });
        }

        try {
            const deletedResult = await this.questionService.delete(questionId);
            if (!deletedResult) {
                return NextResponse.json({ message: 'Échec de la suppression de la question.' }, { status: 400 });
            }
            return NextResponse.json({ message: 'Question supprimé avec succès.' }, { status: 200 });
        } catch (error) {
            console.error('Failed to delete question:', error);
            return NextResponse.json({ message: 'Impossible de supprimer la question.' }, { status: 500 });
        }
    }

    public async getQuestionsByQuizz(req: NextRequest, id: number): Promise<NextResponse> {
        const quizzId: number = id;

        if (isNaN(quizzId)) {
            return NextResponse.json({ message: 'ID quizz invalide.' }, { status: 400 });
        }

        try {
            const questions = await this.questionService.getQuestionsByQuizz(quizzId);
            return NextResponse.json(questions, { status: 200 });
        } catch (error) {
            console.error('Failed to retrieve all questions:', error);
            return NextResponse.json({ message: 'Impossible de récupérer les questions.' }, { status: 500 });
        }
    }
}

export default QuestionController;