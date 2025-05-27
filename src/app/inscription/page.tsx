import { Metadata } from "next";
import QueryClientProvider from "../components/QueryClientProvider";
import SignUp from "./client";

export const metadata: Metadata = {
  title: "Créer un compte | Kidstrotter",
  description: "Inscrivez votre enfant sur Kidstrotter, l'application ludique pour apprendre en s'amusant grâce à des quiz éducatifs dans un univers galactique.",
  keywords: [
    "Kidstrotter",
    "création de compte",
    "quiz éducatifs",
    "application enfants",
    "quiz ludique",
    "apprentissage enfant",
    "univers spatial",
    "jeu éducatif",
    "famille",
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
    title: "Créer un compte | Kidstrotter",
    description: "Créez un compte pour votre enfant et plongez dans l'univers galactique de Kidstrotter, entre jeu et apprentissage !",
    url: "https://kidstrotter.com/sign-up",
    siteName: "Kidstrotter",
    images: [
      {
        url: "https://kidstrotter.com/images/og-signup.jpg",
        width: 1200,
        height: 630,
        alt: "Création de compte sur Kidstrotter, avatar enfant et vaisseau galactique",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Créer un compte | Kidstrotter",
    description: "Un compte sécurisé pour que votre enfant explore les quiz galactiques de Kidstrotter.",
    creator: "@Kidstrotter",
    images: ["https://kidstrotter.com/images/og-signup.jpg"],
  },
  category: "education",
  themeColor: "#2D2DFF",
};

export default function Page() {
  return (
    <QueryClientProvider>
      <SignUp />
    </QueryClientProvider>
  );
}