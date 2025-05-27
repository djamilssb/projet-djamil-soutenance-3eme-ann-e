"use client";

import { formOptions, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import fetchSignUp from "@/utils/fetcher/auth/fetchSignUp";
import QueryClientProvider from "../components/QueryClientProvider";
import Users from "../api/models/Users";
import MenuAvatar from "./components/MenuAvatar";
import { useModale } from "../hooks/useModale";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Metadata } from "next";

const metadata: Metadata = {
  title: "Créer un compte | Kidstrotter",
  description: "Inscrivez votre enfant sur Kidstrotter, l'application ludique pour apprendre en s'amusant grâce à des quiz éducatifs dans un univers galactique.",
  keywords: [
    "Kidstrotter",
    "création de compte",
    "inscription enfant",
    "quiz éducatifs",
    "application enfants",
    "quiz ludique",
    "apprentissage enfant",
    "univers spatial",
    "jeu éducatif",
    "famille",
    "sécurité enfant"
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
        url: "https://kidstrotter.com/images/og-signup.jpg", // à créer ou remplacer
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

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  id_avatar?: number;
  address: string;
  phone: string;
}

const defaultSignUpData: SignUpFormData = {
  username: "",
  email: "",
  password: "",
  id_avatar: undefined,
  address: "",
  phone: "",
};

const formOpts = formOptions({
  defaultValues: defaultSignUpData,
});

function SignUp() {
  const [avatarUrl, setAvatarUrl] = useState<string>("/default_avatar.webp");
  const {isModaleVisible, openModale, closeModale} = useModale();
  const router = useRouter();

  const mutation = useMutation({
  mutationFn: fetchSignUp,
  onSuccess: (result) => {
    if (result) {
      router.push("/connexion");
    } else {
      alert("Erreur lors de l'inscription. Vérifie tes informations.");
    }
  }
});

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const newUser = new Users({
        username: value.username,
        email: value.email,
        password: value.password,
        id_avatar: value.id_avatar,
        address: value.address,
        phone: value.phone,
      });

      mutation.mutate(newUser);
    },
  });

  const handleAvatarSelection = (avatarId: number, avatarUrl: string) => {
    form.setFieldValue("id_avatar", avatarId);
    setAvatarUrl(avatarUrl);
    closeModale();
  };

  return (
    <>
      <h1 hidden>Création de compte - KidsTrotter</h1>

      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <div className="bg-black/80 text-white rounded-xl w-full max-w-4xl p-10">
          <h2 className="text-4xl font-bold mb-8 text-center w-full">
            Création du compte
          </h2>
          <form
            className="flex flex-col md:flex-row w-full gap-8"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-col gap-6 w-[20vw] text-lg">
                <form.Field
                  name="username"
                  children={(field) => (
                    <input
                      type="text"
                      placeholder="Nom d'utilisateur"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                      required
                    />
                  )}
                />
                <form.Field
                  name="email"
                  children={(field) => (
                    <input
                      type="email"
                      placeholder="monemail@gmail.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                      required
                    />
                  )}
                />
                <form.Field
                  name="password"
                  children={(field) => (
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                      required
                    />
                  )}
                />
                <form.Field
                  name="address"
                  children={(field) => (
                    <input
                      type="text"
                      placeholder="Adresse"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                    />
                  )}
                />
                <form.Field
                  name="phone"
                  children={(field) => (
                    <input
                      type="tel"
                      placeholder="Numéro de téléphone"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 w-full md:w-80">
              <div className="relative w-48 h-48 rounded-full overflow-hidden bg-white">
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={openModale}
                className="bg-transparent border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-black cursor-pointer"
              >
                Modifier l&apos;avatar
              </button>
              <button
                type="submit"
                className="w-full bg-[var(--secondary-color)] text-black font-bold py-3 rounded hover:bg-[var(--hover-secondary)] cursor-pointer"
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModaleVisible && <MenuAvatar onAvatarSelect={handleAvatarSelection} />}
    </>
  );
}

export default function Page() {
  return (
    <QueryClientProvider>
      <SignUp />
    </QueryClientProvider>
  );
}