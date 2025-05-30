import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./style.css";

// SPECIFICS METADATA FOR THE PAGE
export const metadata: Metadata = {
  title: "Menu",
  description: "Page de menu de KidsTrotter",
};

export default function Menu(): React.JSX.Element {
  return (
    <>
      <h1 hidden>Menu Principal</h1>

      <section className="flex items-center justify-center h-[90vh] relative">
        <div className="menu-container flex flex-col justify-center items-center w-[37vw] h-auto bg-black opacity-80 z-10 rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2
              id="name-app"
              className="text-white text-3xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4"
            >
              KidsTrotter
            </h2>
          </div>

          <div className="flex flex-col gap-6 items-center justify-center w-full">
            <Link href="/game/selection-du-type" className="w-full flex justify-center">
              <button className="w-fit bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-lg sm:text-xl font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-4">
                Démarrer un quizz
                <Image
                  src="/Circled Right.png"
                  alt="Flèche circulaire"
                  width={24}
                  height={24}
                />
              </button>
            </Link>

            <Link href="/game/quiz/create" className="w-full flex justify-center">
              <button className="w-fit bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-lg sm:text-xl font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-4">
                Créer un quizz
                <Image
                  src="/Circled Right.png"
                  alt="Flèche circulaire"
                  width={24}
                  height={24}
                />
              </button>
            </Link>

            <Link href="/about" className="w-full flex justify-center">
              <button className="w-fit bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-lg sm:text-xl font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-4">
                Qu'est-ce que KidsTrotter ?
                <Image
                  src="/Circled Right.png"
                  alt="Flèche circulaire"
                  width={24}
                  height={24}
                />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}