"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

export function Navbar(): React.JSX.Element | null {
  const pathname = usePathname();

  const hideNavbarOn = ["/choice-character", "/menu"];

  const urlSegments = pathname.split("/");

  if (hideNavbarOn.includes(pathname) || urlSegments.includes("quizzes")) {
    return null;
  }

  return (
    <nav className="mx-4 sm:mx-6 mt-2 ">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
        <Image
          src={"/kt-logo.png"}
          alt="Logo de KidsTrotter"
          height={140}
          width={140}
          className="w-24 sm:w-32 lg:w-[140px] h-auto "
        />
        <span
          id="name-app"
          className="text-[var(--tertiary-color)] bold text-xl sm:text-2xl lg:text-3xl"
        >
          KidsTrotter
        </span>
        <button className="w-full sm:w-auto bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] bold p-3 sm:p-4 rounded cursor-pointer text-sm sm:text-base">
          Se connecter/s&apos;inscrire
        </button>
      </div>
    </nav>
  );
}
