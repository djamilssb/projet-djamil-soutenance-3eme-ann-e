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
        <Image
          src="/background.jpg"
          alt="Fond"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />

        {/* Overlay de menu */}
        <div className="menu-overlay">
          <h2 className="text-white text-4xl font-bold mb-6">KidsTrotter</h2>

          <div className="text-white text-2xl flex flex-col space-y-6 text-center">
            <Link href="/quizz">
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-white text-xl font-bold py-4 px-8 rounded flex items-center justify-between gap-4">
                Démarrer un quizz <span className="arrow">➡️</span>
              </button>
            </Link>
            <Link href="/create">
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-white text-xl font-bold py-4 px-8 rounded flex items-center justify-between gap-4">
                Créer un quizz <span className="arrow">➡️</span>
              </button>
            </Link>
            <Link href="/about">
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-white text-xl font-bold py-4 px-8 rounded flex items-center justify-between gap-4">
                Qu'est-ce que KidsTrotter ? <span className="arrow">➡️</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}