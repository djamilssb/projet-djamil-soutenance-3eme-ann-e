import Link from "next/link";
import BlackContainer from "../components/BlackContainer";
import Form from 'next/form'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion à KidsTrotter",
  description: "",
};

export default function SignIn(): React.JSX.Element {
  return (
    <>
      <h1 hidden>Page de connexion</h1>

      <div className="flex items-center justify-center min-h-[90vh]">
        <BlackContainer>
          <section className="flex flex-col items-center text-white">
            <h2 className=" text-5xl bold mb-12">Connexion</h2>

            <Form action={""} className="flex flex-col text-2xl">
              <label className="mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-[var(--grayed-input)] rounded w-110 h-16 p-2 mb-4"
                required
              />

              <label className="mb-1" htmlFor="password">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-[var(--grayed-input)] w-110 h-16 rounded p-2 mb-4"
                required
              />
            </Form>

            <Link href={"/forget-password"}>
              <p className="text-xl mt-2">Mot de passe oublié ?</p>
            </Link>

            <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] mt-6 mb-4 p-6 text-black text-2xl bold rounded cursor-pointer">Se connecter</button>
            <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] p-6 text-black text-2xl bold rounded cursor-pointer">Créer un compte</button>
          </section>
        </BlackContainer>
      </div>
    </>
  );
}
