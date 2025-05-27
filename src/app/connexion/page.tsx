"use client";

import QueryClientProvider from "../components/QueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import { formOptions, useForm } from "@tanstack/react-form";
import fetchSignIn from "@/utils/fetcher/auth/fetchSignIn";
import Link from "next/link";
import BlackContainer from "../components/BlackContainer";
import Auth from "../api/models/Auth";
import { Metadata } from "next";
import { isEmailValid, isPasswordValid } from "@/utils/regexp/input";
import { useState } from "react";

const metadata: Metadata = {
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
        url: "https://kidstrotter.com/images/og-login.jpg", // à adapter ou générer
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

interface SignInFormData {
  email: string;
  password: string;
  password_kids: string;
}

const defaultSignInData: SignInFormData = {
  email: "",
  password: "",
  password_kids: "",
};

const formOpts = formOptions({
  defaultValues: defaultSignInData,
});

function SignInForm() {
  const mutation = useMutation({
    mutationFn: fetchSignIn,
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const auth = new Auth({
        email: value.email,
        password: value.password,
        password_kids: value.password_kids,
      });
      mutation.mutate(auth);
    },
  });

  return (
    <>
      <h1 hidden>Page de connexion</h1>
      <div className="flex items-center justify-center min-h-[90vh]">
        <BlackContainer>
          <section className="flex flex-col items-center text-white">
            <h2 className="text-3xl bold mb-8">Connexion</h2>
            <form
              className="flex flex-col text-xl"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <label className="mb-1" htmlFor="email">
                Email
              </label>
              <form.Field
                name="email"
                children={(field) => (
                  <input
                    id="email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-[var(--grayed-input)] rounded w-80 h-12 p-2 mb-3"
                    required
                  />
                )}
              />

              <label className="mb-1" htmlFor="password">
                Mot de passe
              </label>
              <form.Field
                name="password"
                children={(field) => (
                  <input
                    id="password"
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-[var(--grayed-input)] w-80 h-12 rounded p-2 mb-3"
                  />
                )}
              />

              {/* <label className="mb-1" htmlFor="password_kids">
                Mot de passe enfant
              </label>
              <form.Field
                name="password_kids"
                children={(field) => (
                  <input
                    id="password_kids"
                    type="password"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="bg-[var(--grayed-input)] w-80 h-12 rounded p-2 mb-3"
                  />
                )}
              /> */}

              <Link href={"/forget-password"}>
                <p className="text-base text-center mt-2 mb-2 underline">
                  Mot de passe oublié ?
                </p>
              </Link>

              <button
                type="submit"
                className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] mt-4 mb-2 p-4 text-black text-xl bold rounded cursor-pointer"
              >
                Se connecter
              </button>
              <button
                type="button"
                className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] p-4 text-black text-xl bold rounded cursor-pointer"
              >
                Créer un compte
              </button>
            </form>
          </section>
        </BlackContainer>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <QueryClientProvider>
      <SignInForm />
    </QueryClientProvider>
  );
}
