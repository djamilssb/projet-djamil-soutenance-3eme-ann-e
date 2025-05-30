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
        <div className="menu-container flex flex-col justify-center items-center w-[40vw] h-auto bg-black bg-opacity-50 z-10 rounded-lg p-8 shadow-lg">
          <span id="name-app" className="text-[var(--tertiary-color)] bold">
            KidsTrotter
          </span>
          <div className="text-white text-2xl flex flex-col space-y-6 text-center">
            <Link href="/game/selection-du-type">
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-xl font-bold py-4 px-8 rounded flex items-center justify-between gap-4 cursor-pointer">
                Démarrer un quizz
                <Image
                  src="/Circled Right.png"
                  alt="Flèche circulaire"
                  width={24}
                  height={24}
                />
              </button>
            </Link>
            <Link href="/account">
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-xl font-bold py-4 px-8 rounded flex items-center justify-between gap-4 cursor-pointer">
                Créer un quizz
                <Image
                  src="/Circled Right.png"
                  alt="Flèche circulaire"
                  width={24}
                  height={24}
                />
              </button>
            </Link>
            <Link href="/presentation">
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-xl font-bold py-4 px-8 rounded flex items-center justify-between gap-4 cursor-pointer">
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
