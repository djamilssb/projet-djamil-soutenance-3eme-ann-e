import Link from "next/link";
import React from "react";

export default function ChoixQuizzPage(): React.JSX.Element {
  return (
    <>
      <h1 hidden>Choix du quizz</h1>


      <section className="flex flex-col items-center justify-center h-[90vh]">
        <div className="flex flex-row gap-12">
          <Link href="/quizz/generé">
            <button className="quiz-button">Quizz généré</button>
          </Link>
          <Link href="/quizz/personnalisé">
            <button className="quiz-button">Quizz personnalisé</button>
          </Link>
        </div>
      </section>
    </>
  );
}
