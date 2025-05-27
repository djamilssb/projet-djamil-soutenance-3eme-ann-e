import QuizClient from "./QuizClient";

export default function QuizzPage({ 
  searchParams 
}: { 
  searchParams: { quizId?: string, avatarId?: string } 
}) {
  const quizIdParam = String(searchParams?.quizId || "1");
  const quizId = parseInt(quizIdParam);
  
  const avatarIdParam = String(searchParams?.avatarId || "1");
  const avatarId = parseInt(avatarIdParam);

  return <QuizClient quizId={quizId} avatarId={avatarId} />;
}