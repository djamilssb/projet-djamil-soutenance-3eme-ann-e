import QuizClient from "./QuizClient";

export default async function QuizzPage({ 
  searchParams 
}: { 
  searchParams: { quizId?: string } 
}) {
  // Utilisez await pour les searchParams dans une fonction async
  const quizId = parseInt(searchParams.quizId || "1");
  
  return <QuizClient quizId={quizId} />;
}