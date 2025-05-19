"use client";

import Image from "next/image";
import { formOptions, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import fetchSignUp from "@/utils/fetcher/auth/fetchSignUp";
import QueryClientProvider from "../components/QueryClientProvider";
import Users from "../api/models/Users";

interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  password_kids: string;
}

const defaultSignUpData: SignUpFormData = {
  username: "",
  email: "",
  password: "",
  password_kids: "",
};

const formOpts = formOptions({
  defaultValues: defaultSignUpData,
});

function SignUp() {
  const mutation = useMutation({
    mutationFn: fetchSignUp,
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const newUser = new Users({
        username: value.username,
        email: value.email,
        password: value.password,
        password_kids: value.password_kids,
      });

      mutation.mutate(newUser);
    },
  });

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
            onSubmit={form.handleSubmit}
          >
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex flex-col gap-6 w-[20vw] text-lg">
                {" "}
                <form.Field
                  name="username"
                  children={(field) => (
                    <input
                      type="text"
                      placeholder="username"
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
                      placeholder="********"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                      required
                    />
                  )}
                />
                <form.Field
                  name="password_kids"
                  children={(field) => (
                    <input
                      type="password"
                      placeholder="********"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-6 w-full md:w-80">
              <div className="relative w-48 h-48 rounded-full overflow-hidden bg-white">
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                className="bg-transparent border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-black cursor-pointer"
              >
                Modifier l’avatar
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
