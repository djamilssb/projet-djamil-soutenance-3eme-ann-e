import { Metadata } from "next";
import QuizList from "@/app/components/quizzes/QuizList";
import './style.css';

export const metadata: Metadata = {
  title: "Liste des Quiz - KidsTrotter",
  description: "Explorez et jouez aux quiz disponibles",
};

export default function QuizzListPage() {
  return (
    <div className="quizz-container">
      <h1>Liste des Quiz</h1>
      {}
      <QuizList 
        isCustom={false} 
        showCreateButton={false} 
      />
    </div>
  );
}
