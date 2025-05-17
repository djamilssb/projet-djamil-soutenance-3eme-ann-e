import Image from "next/image";
import Form from "next/form";

export default function SignUp() {
  return (
    <>
      <h1 hidden>Création de compte - KidsTrotter</h1>

      <div className="flex items-center justify-center min-h-[90vh] px-4">
        <div className="bg-black/80 text-white rounded-xl flex flex-col md:flex-row w-full max-w-4xl p-10 gap-8">

          <Form action="" className="flex flex-col md:flex-row w-full gap-8">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-8 text-center">
                  Création du compte
                </h2>
                <div className="space-y-4 text-lg">
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Mot de passe"
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="Confirmer mot de passe"
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      placeholder="Nom"
                      className="w-1/2 h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                    />
                    <input
                      type="text"
                      placeholder="Prénom"
                      className="w-1/2 h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Adresse"
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="N° de téléphone"
                      className="w-full h-12 p-3 rounded bg-[var(--grayed-input)] text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-6">
              <div className="flex flex-col items-center gap-6">
                <div className="relative w-64 h-64 rounded-full overflow-hidden bg-white">
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
                className="w-full mt-4 bg-[var(--secondary-color)] text-black font-bold py-3 rounded hover:bg-[var(--hover-secondary)] cursor-pointer"
              >
                Valider
              </button>
              </div>
            </div>
          </Form>

        </div>
      </div>
    </>
  );
}