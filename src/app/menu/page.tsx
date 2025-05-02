import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <div className="flex flex-col justify-center items-center w-[40vw] h-[60vh] bg-black bg-opacity-80 z-10 rounded-lg p-8">
          <Image
            src="/kt-logo.png"
            alt="Logo KidsTrotter"
            width={100}
            height={100}
            className="mb-6"
          />

          <div className="text-white text-2xl flex flex-col space-y-6 text-center">
            <Link href="/quizz" className="hover:underline">Démarrer un quizz</Link>
            <Link href="/create" className="hover:underline">Créer un quizz</Link>
            <Link href="/about" className="hover:underline">Qu'est-ce que KidsTrotter ?</Link>
          </div>
        </div>

      </section>
    </>
  );
}