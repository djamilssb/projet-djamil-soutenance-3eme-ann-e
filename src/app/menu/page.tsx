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

      <section className="flex items-center justify-center h-[100vh] relative">
        {/* Background image */}
        <Image
          src="/background.jpg" // ← à remplacer par ton fond visuel
          alt="Fond"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />

        {/* Overlay de menu */}
        <div className="flex flex-col justify-center items-center w-[40vw] h-[60vh] bg-black bg-opacity-80 z-10 rounded-lg p-8">
          {/* Logo globe */}
          <Image
            src="/kt-logo.png"
            alt="Logo KidsTrotter"
            width={100}
            height={100}
            className="mb-6"
          />

          {/* Liens de navigation */}
          <div className="text-white text-2xl flex flex-col space-y-6 text-center">
            <Link href="/quizz" className="hover:underline">Démarrer un quizz</Link>
            <Link href="/create" className="hover:underline">Créer un quizz</Link>
            <Link href="/about" className="hover:underline">Qu'est-ce-que KidsTrotter ?</Link>
          </div>
        </div>

        {/* Flèche retour en CSS */}
        <Link href="/" className="absolute top-6 left-6 z-20">
            <div className="arrow-left"></div>
        </Link>


        {/* Avatar coin haut droit */}
        <Image
          src="/avatar.png" // ← image de profil coin haut droit
          alt="Avatar"
          width={60}
          height={60}
          className="absolute top-6 right-6 z-20 rounded-full"
        />

        {/* Pied de page */}
        <div className="absolute bottom-4 w-full px-8 flex justify-between text-white text-sm z-20">
          <div className="space-x-6">
            <Link href="/cookies">Gestion des cookies</Link>
            <Link href="/cgu">Conditions générales d'utilisation</Link>
          </div>
          <Link href="/contact">
            <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-500">
              Nous contacter
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
