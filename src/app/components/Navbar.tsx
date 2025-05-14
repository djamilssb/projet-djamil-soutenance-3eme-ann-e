"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navbar(): React.JSX.Element | null {
  const pathname = usePathname();

  // Liste des pages où la navbar ne doit pas apparaître
  const hideNavbarOn = ["/choice-character", "/menu", "/account/quizzes", "/account/quizzes/create"];

  // Si la page actuelle est dans la liste, ne pas afficher la navbar
  if (hideNavbarOn.includes(pathname)) {
    return null;
  }

  return (
    <nav className="mr-6 ml-6 mt-2 levitate">
      <div className="flex items-center justify-between">
        <Image
          src={"/kt-logo.png"}
          alt="Logo de KidsTrotter"
          height={140}
          width={140}
        />
        <span
          id="name-app"
          className="text-[var(--tertiary-color)] bold"
        >
          KidsTrotter
        </span>
        <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] bold p-4 rounded cursor-pointer">
          Se connecter/s&apos;inscrire
        </button>
      </div>
    </nav>
  );
}