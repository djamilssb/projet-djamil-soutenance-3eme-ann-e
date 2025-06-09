import { Metadata } from "next";
import Link from "next/link";
import "./style.css";

export const metadata: Metadata = {
  title: "Qu'est-ce que KidsTrotter ? | Application éducative pour enfants",
  description: "Découvrez KidsTrotter, l'application de quiz éducatifs qui prépare les enfants à leurs voyages scolaires et familiaux à travers des aventures spatiales ludiques.",
  keywords: [
    "KidsTrotter",
    "quiz éducatifs",
    "voyages scolaires",
    "préparation voyage",
    "enfants",
    "culture générale",
    "apprentissage ludique",
    "géographie",
    "histoire",
    "aventure spatiale"
  ],
};

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="about-container about-page"> 
      <div className="about-content">
        <div className="about-wrapper">
          <div className="text-white scrollable-content">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-[var(--secondary-color)]">
              Qu&apos;est-ce que KidsTrotter ?
            </h1>

            <div className="space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed">
              <section>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--secondary-color)]">
                  🚀 Une aventure spatiale éducative
                </h2>
                <p>
                  KidsTrotter est une application web ludique qui transforme l&apos;apprentissage en aventure spatiale ! 
                  Votre enfant devient un petit astronaute explorateur qui découvre le monde à travers des quiz 
                  éducatifs passionnants.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--secondary-color)]">
                  ✈️ Préparer les voyages en s&apos;amusant
                </h2>
                <p>
                  Que ce soit pour un voyage scolaire ou des vacances en famille, KidsTrotter prépare votre enfant 
                  en lui faisant découvrir la géographie, l&apos;histoire et la culture des destinations qu&apos;il va visiter. 
                  Fini le stress de l&apos;inconnu, place à l&apos;excitation de la découverte !
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--secondary-color)]">
                  🧠 Développer la culture générale
                </h2>
                <p>
                  À travers des quiz adaptés à leur âge, les enfants enrichissent leurs connaissances sur :
                </p>
                <ul className="list-disc list-inside mt-3 ml-4 space-y-2">
                  <li>La géographie mondiale (pays, capitales, monuments)</li>
                  <li>L&apos;histoire des civilisations</li>
                  <li>Les cultures et traditions locales</li>
                  <li>La nature et les animaux du monde entier</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--secondary-color)]">
                  👨‍👩‍👧‍👦 Une expérience sécurisée pour toute la famille
                </h2>
                <p>
                  KidsTrotter est conçu pour offrir un environnement d&apos;apprentissage sûr et adapté aux enfants, 
                  avec un contrôle parental intégré et des contenus soigneusement sélectionnés pour leur âge.
                </p>
              </section>

              <section>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[var(--secondary-color)]">
                  🎮 Comment ça marche ?
                </h2>
                <div className="space-y-3">
                  <p><strong>1.</strong> Votre enfant choisit son avatar d&apos;astronaute</p>
                  <p><strong>2.</strong> Il sélectionne un quiz selon sa destination ou ses centres d&apos;intérêt</p>
                  <p><strong>3.</strong> Il répond aux questions dans un univers spatial immersif</p>
                  <p><strong>4.</strong> Il découvre de nouvelles connaissances tout en s&apos;amusant !</p>
                </div>
              </section>
            </div>

            <div className="flex justify-center mt-8 pb-4">
              <Link href="/game/menu" className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Retour au menu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}