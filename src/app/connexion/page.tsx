"use client";

import QueryClientProvider from "../components/QueryClientProvider";
import { useMutation } from "@tanstack/react-query";
import { formOptions, useForm } from "@tanstack/react-form";
import fetchSignIn from "@/utils/fetcher/auth/fetchSignIn";
import Link from "next/link";
import BlackContainer from "../components/BlackContainer";
import Auth from "../api/models/Auth";

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
              onSubmit={form.handleSubmit}
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

              <label className="mb-1" htmlFor="password_kids">
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
              />

              <Link href={"/forget-password"}>
                <p className="text-base text-center mt-2 mb-2 underline">Mot de passe oublié ?</p>
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