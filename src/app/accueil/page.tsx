import { cookies } from 'next/headers';
import { Metadata } from "next";
import Image from "next/image";
import "./style.css";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Kidstrotter | Quiz éducatifs pour enfants",
  description:
    "Bienvenue sur Kidstrotter, l'univers galactique où les enfants s'amusent tout en développant leur culture générale grâce à des quiz ludiques et éducatifs.",
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
    "futuriste",
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
    description:
      "Kidstrotter propose à votre enfant une aventure spatiale remplie de quiz éducatifs et amusants pour enrichir ses connaissances.",
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
    description:
      "Une aventure éducative interstellaire pour apprendre en jouant !",
    creator: "@Kidstrotter",
    images: ["https://kidstrotter.com/images/og-home.jpg"],
  },
  category: "education",
  themeColor: "#2D2DFF",
};

async function checkAuthentication() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    return !!token;
}

export default async function Home(): Promise<React.JSX.Element> {
  const isAuthenticated = await checkAuthentication();
  
  return (
    <>
      <h1 hidden>Accueil</h1>

      <section className="flex flex-col sm:flex-row items-center justify-center h-[calc(100vh-120px)] px-4 sm:px-0  gap-4 sm:gap-6">

        <Image
          src="/alien1.png"
          alt="Alien character"
          width={580}
          height={580}
          className="w-[32vw] h-auto"
          priority
        />

        <div className="w-full sm:w-[43vw]">
          <div className="flex flex-col relative justify-center items-center w-full sm:w-[35vw] sm:h-[27vw] bg-black opacity-[90%] rounded p-3 sm:p-4 lg:p-6 mt-15 sm:mt-12 lg:mt-16">

            <Image
              src="/vaisseau.png"
              alt="Spaceship"
              width={150}
              height={150}
              className="absolute right-0 top-0 z-25 w-[19vw] translate-x-20 -translate-y-25 levitate"
            />

            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-6 sm:mb-3 lg:mb-4">
              Bienvenue
            </h2>

            <p className="text-white text-sm sm:text-base lg:text-lg xl:text-xl text-center mb-3 mt-6 sm:mb-4 lg:mb-6 px-2">
              Créez un compte pour votre enfant afin qu&apos;il s&apos;amuse tout en développant sa culture générale grâce à des quizz ludiques et éducatifs !
            </p>

            <Link href={isAuthenticated ? "/game/menu" : "/connexion"}>
              <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-sm sm:text-base lg:text-lg xl:text-xl font-bold px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-4 cursor-pointer">
                Commencer l&apos;aventure
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
