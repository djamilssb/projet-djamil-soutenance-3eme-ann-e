import Link from "next/link";
import React from "react";

export default function ChoixQuizzPage(): React.JSX.Element {
  return (
    <>
      <h1 hidden>Choix du quizz</h1>

      <section className="flex flex-col items-center justify-center h-[90vh] bg-[url('/globe.svg')] bg-cover bg-center">
        <h2 className="text-white text-3xl font-bold mb-8">Définissez les thèmes :</h2>
        <div className="flex flex-row gap-12">
          <Link href="/quizz/generé">
            <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-white text-xl font-bold py-4 px-8 rounded">
              Quizz généré
            </button>
          </Link>
          <Link href="/quizz/personnalisé">
            <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-white text-xl font-bold py-4 px-8 rounded">
              Quizz personnalisé
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
