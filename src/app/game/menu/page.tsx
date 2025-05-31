import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./style.css";

export const metadata: Metadata = {
  title: "Menu",
  description: "Page de menu de KidsTrotter",
};

export default function Menu(): React.JSX.Element {
  return (
    <div className="menu-page-container">
      <h1 hidden>Menu Principal</h1>

      <section className="flex items-center justify-center h-full relative">
        <div className="menu-container flex flex-col justify-center items-center w-[90%] max-w-[500px] lg:w-[37vw] h-auto bg-black bg-opacity-80 z-10 rounded-lg p-6 lg:p-8 shadow-lg">
          <div className="text-center mb-6 lg:mb-8">
            <h2
              id="name-app"
              className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            >
              KidsTrotter
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:gap-6 items-center justify-center w-full">
            <Link href="/game/selection-du-type" className="w-full flex justify-center">
              <button className="w-fit bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-base sm:text-lg lg:text-xl font-bold py-3 px-5 lg:py-4 lg:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 lg:gap-4">
                Démarrer un quizz
                <Image
                  src="/Circled Right.png"
                  alt="Flèche circulaire"
                  width={20}
                  height={20}
                  className="lg:w-6 lg:h-6"
                />
              </button>
            </Link>

            <Link href="/game/quiz/create" className="w-full flex justify-center">
              <button className="w-fit bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-base sm:text-lg lg:text-xl font-bold py-3 px-5 lg:py-4 lg:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 lg:gap-4">
                Créer un quizz
                <Image
                  src="/Circled Right.png"
                  alt="Flèche circulaire"
                  width={20}
                  height={20}
                  className="lg:w-6 lg:h-6"
                />
              </button>
            </Link>

            <Link href="/about" className="w-full flex justify-center">
              <button className="w-fit bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-base sm:text-lg lg:text-xl font-bold py-3 px-5 lg:py-4 lg:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 lg:gap-4">
                Qu'est-ce que KidsTrotter ?
                <Image
                  src="/Circled Right.png"
                  alt="Flèche circulaire"
                  width={20}
                  height={20}
                  className="lg:w-6 lg:h-6"
                />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}