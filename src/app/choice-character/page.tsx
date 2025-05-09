import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Select character",
  description: "Welcome to the select character page!",
};

export default function ChoiceCharacter(): React.JSX.Element {
  return (
    <div>
      <h1 hidden>Choisir un personnage</h1>
      <section className="choice-character-page flex flex-col items-center justify-center h-[90vh] bg-cover bg-center relative">
        <Link href="/menu">
          <div className="absolute top-4 left-4 cursor-pointer flex items-center">
            <Image
              src="/Left 3.png"
              alt="Flèche gauche"
              width={40}
              height={40}
              className="w-10 h-10 transition-transform transform hover:scale-110 active:scale-95 active:brightness-75"
            />
          </div>
        </Link>

        {/* Titre */}
        <h2 className="text-white text-3xl font-bold mb-8">
          Choisir un personnage :
        </h2>

        <div className="flex flex-row gap-16">
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
    </div>
  );
}