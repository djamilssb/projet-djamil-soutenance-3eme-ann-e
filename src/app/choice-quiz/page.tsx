import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function ChoixQuizzPage(): React.JSX.Element {
  return (
    <>

      <Link href="/home">
        <div className="absolute top-4 left-4 cursor-pointer flex items-center">
          <Image
            src="/Left 3.png"
            alt="Retour à l'accueil"
            width={40}
            height={40}
            className="w-10 h-10 transition-transform transform hover:scale-110 active:scale-95 active:brightness-75"
          />
        </div>
      </Link>

      <section className="flex flex-col items-center justify-center h-[90vh] bg-cover bg-center">
        <h2 className="text-white text-3xl font-bold mb-8">Définissez les thèmes :</h2>
        <div className="flex flex-row gap-12">
          <Link href="/quizz/generé">
            <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-xl font-bold py-4 px-8 rounded">
              Quizz généré
            </button>
          </Link>
          <Link href="/quizz/personnalisé">
            <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-xl font-bold py-4 px-8 rounded">
              Quizz personnalisé
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
