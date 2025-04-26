"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import ArrowBack from "./ArrowBack";

export function Navbar(): React.JSX.Element {
  const loginPath = usePathname().includes("/sign-in");

  return loginPath ? (
    <ArrowBack />
  ) : (
    <nav className="mr-6 ml-6 mt-2 levitate">
      <div className="flex items-center justify-between">
        <Image
          src={"/kt-logo.png"}
          alt="Logo de KidsTrotter"
          height={140}
          width={140}
        />
        <span id="name-app" className="text-[var(--tertiary-color)] bold">
          KidsTrotter
        </span>
        <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] bold p-4 rounded cursor-pointer">
          Se connecter/s&apos;inscrire
        </button>
      </div>
    </nav>
  );
}
