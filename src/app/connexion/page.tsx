import { Metadata } from "next";
import QueryClientProvider from "../components/QueryClientProvider";
import SignInForm from "./client";

export const metadata: Metadata = {
  title: "Connexion | Kidstrotter",
  description: "Connectez-vous à votre compte Kidstrotter pour permettre à votre enfant de retrouver ses quiz éducatifs et continuer son aventure spatiale en toute sécurité.",
  keywords: [
    "Kidstrotter",
    "connexion",
    "login enfant",
    "application éducative",
    "quiz enfant",
    "apprentissage ludique",
    "univers spatial",
    "jeu éducatif",
    "quiz sécurisé",
    "parents",
    "interface famille"
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
    title: "Connexion | Kidstrotter",
    description: "Reprenez l'aventure galactique de votre enfant avec Kidstrotter. Connectez-vous pour accéder à son espace de quiz éducatifs.",
    url: "https://kidstrotter.com/connexion",
    siteName: "Kidstrotter",
    images: [
      {
        url: "https://kidstrotter.com/images/og-login.jpg",
        width: 1200,
        height: 630,
        alt: "Écran de connexion à Kidstrotter avec un fond spatial",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Connexion | Kidstrotter",
    description: "Accédez au compte de votre enfant pour qu'il retrouve ses quiz et continue d'apprendre en s'amusant.",
    creator: "@Kidstrotter",
    images: ["https://kidstrotter.com/images/og-login.jpg"],
  },
  category: "education",
  themeColor: "#2D2DFF",
};

export default function Page() {
  return (
    <QueryClientProvider>
      <SignInForm />
    </QueryClientProvider>
  );
}
