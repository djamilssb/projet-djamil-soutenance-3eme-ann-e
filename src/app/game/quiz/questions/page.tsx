import QuizClient from "./QuizClient";

export default function QuizzPage({ 
  searchParams 
}: { 
  searchParams: { quizId?: string } 
}) {

  const quizIdParam = String(searchParams?.quizId || "1");
  const quizId = parseInt(quizIdParam);

  return <QuizClient quizId={quizId} />;
}