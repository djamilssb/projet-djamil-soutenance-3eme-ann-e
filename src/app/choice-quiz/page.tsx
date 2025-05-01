import Link from "next/link";
import React from "react";

export default function ChoixQuizzPage(): React.JSX.Element {
  return (
    <>
      <h1 hidden>Choix du quizz</h1>

      <Link href="/" className="absolute top-6 left-6 z-20">
        <div className="arrow-left"></div>
      </Link>

      <div className="absolute top-6 right-6 z-20 w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center shadow">
        <span className="text-2xl font-bold">/</span>
      </div>

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

      <footer className="absolute bottom-4 left-0 right-0 flex justify-between px-8 text-white text-sm">
        <div className="flex gap-6">
          <Link href="#">Gestion des cookies</Link>
          <Link href="#">Conditions générales d'utilisation</Link>
        </div>
        <Link href="/contact">
          <button className="bg-yellow-400 text-black font-medium px-4 py-2 rounded">
            Nous contacter
          </button>
        </Link>
      </footer>
    </>
  );
}
