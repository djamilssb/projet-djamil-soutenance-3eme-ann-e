"use client";

import { formOptions, useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import fetchSignUp from "@/utils/fetcher/auth/fetchSignUp";
import Users from "../api/models/Users";
import MenuAvatar from "./components/MenuAvatar";
import { useModale } from "../hooks/useModale";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isEmailValid, isPasswordValid, isPhoneValid, isUsernameValid } from "@/utils/regexp/input";
import { SignUpFormData } from "@/interfaces/SignUpFormData";

const defaultSignUpData: SignUpFormData = {
  username: "",
  email: "",
  password: "",
  password_kids: "",
  id_avatar: undefined,
  address: "",
  phone: "",
};

const formOpts = formOptions({
  defaultValues: defaultSignUpData,
});

function SignUp() {
  const [avatarUrl, setAvatarUrl] = useState<string>("/default_avatar.webp");
  const [hasEmailValid, setHasEmailValid] = useState<boolean>(true);
  const [hasUsernameValid, setHasUsernameValid] = useState<boolean>(true);
  const [hasPasswordValid, setHasPasswordValid] = useState<boolean>(true);
  const [hasPhoneValid, setHasPhoneValid] = useState<boolean>(true);
  const { isModaleVisible, openModale, closeModale } = useModale();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: fetchSignUp,
    onSuccess: (result) => {
      if (result) {
        router.push("/connexion");
      }
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      if (!isUsernameValid(value.username)) {
        setHasUsernameValid(false);
        return;
      }

      if (!isEmailValid(value.email)) {
        setHasEmailValid(false);
        return;
      }

      if (!isPasswordValid(value.password)) {
        setHasPasswordValid(false);
        return;
      }

      if (!isPhoneValid(value.phone)) {
        setHasPhoneValid(false);
        return;
      }

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
                <form.Field name="username">
                  {(field) => (
                    <div>
                      <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          setHasUsernameValid(true);
                        }}
                        className={`w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white ${!hasUsernameValid ? "border-2 border-red-500" : ""}`}
                        required
                      />
                      {!hasUsernameValid && (
                        <p className="text-red-500 text-sm mt-1">
                          Le nom d&apos;utilisateur doit contenir au moins 3 caractères alphanumériques.
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
                <form.Field name="email">
                  {(field) => (
                    <div>
                      <input
                        type="email"
                        placeholder="monemail@gmail.com"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          setHasEmailValid(true);
                        }}
                        className={`w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white ${!hasEmailValid ? "border-2 border-red-500" : ""}`}
                        required
                      />
                      {!hasEmailValid && (
                        <p className="text-red-500 text-sm mt-1">
                          Veuillez entrer une adresse email valide.
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
                <form.Field name="password">
                  {(field) => (
                    <div>
                      <input
                        type="password"
                        placeholder="Mot de passe"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          setHasPasswordValid(true);
                        }}
                        className={`w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white ${!hasPasswordValid ? "border-2 border-red-500" : ""}`}
                        required
                      />
                      {!hasPasswordValid && (
                        <p className="text-red-500 text-sm mt-1">
                          Le mot de passe doit contenir au moins 12 caractères.
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
                {/* <form.Field name="password_kids">
                  {(field) => (
                    <input
                      type="password"
                      placeholder="Mot de passe enfant"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                    />
                  )}
                </form.Field> */}
                <form.Field name="address">
                  {(field) => (
                    <input
                      type="text"
                      placeholder="Adresse"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                    />
                  )}
                </form.Field>
                <form.Field name="phone">
                  {(field) => (
                    <div>
                      <input
                        type="tel"
                        placeholder="Numéro de téléphone"
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e.target.value);
                          setHasPhoneValid(true);
                        }}
                        className={`w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white ${!hasPhoneValid ? "border-2 border-red-500" : ""}`}
                      />
                      {!hasPhoneValid && (
                        <p className="text-red-500 text-sm mt-1">
                          Veuillez entrer un numéro de téléphone valide.
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
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

export default SignUp;