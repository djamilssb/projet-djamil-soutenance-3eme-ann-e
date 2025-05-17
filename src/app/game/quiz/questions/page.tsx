import Image from "next/image";

export default function QuizzPage() {
  return (
    <div className="quizz-page relative w-full">
      {/* Image de fond */}
      <div className="absolute top-0 left-0 w-full h-[100vh]">
        <Image
          src="/paris.png"
          alt="Background de la question"
          className="object-cover object-center"
          fill
          priority
        />
      </div>
      {/* Contenu du quizz */}
      <div className="quizz-content relative z-10">
        <div className="question-container">
          <p className="question-text">
            <strong>Jayson :</strong> Dans quelle ville se trouve ce monument ?
          </p>
          <div className="answer-options">
            <p>
              a. Paris &nbsp;&nbsp; b. Londres &nbsp;&nbsp; c. Berlin
              &nbsp;&nbsp; d. Tokyo
            </p>
          </div>
        </div>
        <img src="/alien1.png" alt="Personnage Alien" className="character" />
      </div>
    </div>
  );
}