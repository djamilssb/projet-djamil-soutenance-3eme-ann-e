import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// SPECIFICS METADATA FOR THE PAGE
export const metadata: Metadata = {
    title: "Home",
    description: "Welcome to the home page!",
}

export default function Home(): React.JSX.Element {
  return (
    <>
      <h1 hidden>Accueil</h1>

      <section className="flex items-center justify-center flex-row h-[90vh] levitate">
        <Image
          src="/alien1.png"
          alt="Character"
          width={580}
          height={580}
          className="mt-20"
        />
        <div className="w-[43vw] relative">
          <Image src="/vaisseau.png" alt="" height={400} width={400} className="absolute right-0 bottom-70 z-25"/>
          <div className="flex flex-col justify-center items-center w-[35vw] h-[45vh] mt-54 bg-black opacity-[90%] rounded p-8">
            <h2 className="text-white text-5xl text-center mt-4 mb-8">Bienvenue !</h2>
            <p className="text-white text-2xl mb-8">Créez un compte pour votre enfant afin qu'il s'amuse tout en développant sa culture générale grâce à des quizz ludiques et éducatifs !</p>
            <Link href="/sign-in">
              <button 
              className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-2xl bold p-12 rounded cursor-pointer"
              >
                Commencer à jouer
                </button>
            </Link>
          </div>
        </div>

      </section>

    </>
  );
}