import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Select character",
  description: "Welcome to the select character page!",
};

export default function ChoiceCharacter(): React.JSX.Element {
  return (
    <>
      <h1 hidden>Choisir un personnage</h1>

      <section className="choice-character-page flex flex-col items-center justify-center h-[90vh] bg-cover bg-center relative">
        <Link href="/menu">
          <div className="absolute top-4 left-4 cursor-pointer flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </Link>

        {/* Titre */}
        <h2 className="text-white text-3xl font-bold mb-8">
          Choisir un personnage :
        </h2>

        {/* Personnages */}
        <div className="flex flex-row gap-16">
          {/* Personnage 1 */}
          <Link href="/character/1">
            <div className="cursor-pointer hover:scale-105 transition-transform">
              <Image
                src="/alien1.png"
                alt="Personnage 1"
                width={500}
                height={500}
              />
            </div>
          </Link>

          {/* Personnage 2 */}
          <Link href="/character/2">
            <div className="cursor-pointer hover:scale-105 transition-transform">
              <Image
                src="/AlienVert 1.png"
                alt="Personnage 2"
                width={500}
                height={500}
              />
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}