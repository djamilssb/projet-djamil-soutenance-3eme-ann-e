import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function ChoixQuizzPage(): React.JSX.Element {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-[90vh] bg-cover bg-center">
        <h2 className="text-white text-3xl font-bold mb-8">Définissez les thèmes :</h2>
        <div className="flex flex-row gap-12">
          <Link href="/game/quiz-list?type=generic">
            <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-xl font-bold py-4 px-8 rounded cursor-pointer">
              Quizz généré
            </button>
          </Link>
          <Link href="/game/quiz-list?type=personal">
            <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-xl font-bold py-4 px-8 rounded cursor-pointer">
              Quizz personnalisé
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
