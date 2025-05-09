import { NextRequest } from "next/server";
import AnswerController from "../controllers/AnswerController";

const answerController = new AnswerController();

export async function GET(req: NextRequest) {
    return answerController.getAllAnswers(req);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newAnswer = body;
  
    return await answerController.createAnswer(req, newAnswer);
} 