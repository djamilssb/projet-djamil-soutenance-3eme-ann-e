import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./style.css";

export const metadata: Metadata = {
  title: "Select character",
  description: "Welcome to the select character page!",
};

export default function ChoiceCharacter({
  searchParams,
}: {
  searchParams: { quizId?: string };
}): React.JSX.Element {
  const quizId = searchParams?.quizId || "1";

  return (
    <div className="choice-character-container">
      <h1 hidden>Choisir un personnage</h1>
      <section className="choice-character-page flex flex-col items-center justify-center h-full bg-cover bg-center relative">
        <h2 className="text-white text-3xl font-bold mb-8">
          Choisir un personnage :
        </h2>

        <div className="flex flex-row gap-16">
          <Link href={`/game/quiz/questions?quizId=${quizId}&avatarId=1`}>
            <div className="cursor-pointer hover:scale-105 transition-transform">
              <Image
                src="/alien1.png"
                alt="Personnage 1"
                width={500}
                height={500}
              />
            </div>
          </Link>

          <Link href={`/game/quiz/questions?quizId=${quizId}&avatarId=2`}>
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