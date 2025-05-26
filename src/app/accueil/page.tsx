import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Kidstrotter | Quiz éducatifs pour enfants",
  description: "Bienvenue sur Kidstrotter, l'univers galactique où les enfants s'amusent tout en développant leur culture générale grâce à des quiz ludiques et éducatifs.",
  keywords: [
    "Kidstrotter",
    "quiz enfants",
    "éducation ludique",
    "apprentissage interactif",
    "quiz culture générale",
    "jeu éducatif",
    "application enfant",
    "quiz galactique",
    "ludique",
    "espace",
    "futuriste"
  ],
  authors: [{ name: "Kidstrotter", url: "https://kidstrotter.com" }],
  creator: "Kidstrotter",
  publisher: "Kidstrotter",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: "Kidstrotter | Apprendre en s'amusant",
    description: "Kidstrotter propose à votre enfant une aventure spatiale remplie de quiz éducatifs et amusants pour enrichir ses connaissances.",
    url: "https://kidstrotter.com",
    siteName: "Kidstrotter",
    images: [
      {
        url: "https://kidstrotter.com/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Enfant astronaute avec un alien rigolo et un vaisseau spatial dans l'univers de Kidstrotter",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kidstrotter | Quiz galactiques pour enfants",
    description: "Une aventure éducative interstellaire pour apprendre en jouant !",
    creator: "@Kidstrotter",
    images: ["https://kidstrotter.com/images/og-home.jpg"],
  },
  category: "education",
  themeColor: "#2D2DFF",
};


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