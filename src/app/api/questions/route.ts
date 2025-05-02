import { NextRequest } from "next/server";
import QuestionController from "../controllers/QuestionController";

const questionController = new QuestionController;

export async function GET(req: NextRequest) {
    return questionController.getAllQuestions(req);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newQuestion = body;
  
    return await questionController.createQuestion(req, newQuestion);
} 