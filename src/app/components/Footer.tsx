import Link from "next/link";
import React from "react";

export function Footer(): React.JSX.Element {
  return (
    <section className="flex flex-col sm:flex-row justify-between p-4 gap-4 sm:gap-0 ">
      <h2 hidden>Footer menu</h2>
      <div className="bg-[var(--secondary-color)] flex flex-col sm:flex-row max-w-fit gap-2 sm:gap-4 rounded bold">
        <Link href="/construction" className="w-full sm:w-auto text-center">
          <div className="hover:bg-[var(--hover-secondary)] p-2 rounded">
            <h3 className="text-sm sm:text-base">
              Conditions générales d&apos;utilisation
            </h3>
          </div>
        </Link>
        <Link href="/construction" className="w-full sm:w-auto text-center">
          <div className="hover:bg-[var(--hover-secondary)] p-2 rounded">
            <h3 className="text-sm sm:text-base">Gestion des cookies</h3>
          </div>
        </Link>
      </div>
      <Link href="/construction" className="w-full sm:w-auto text-center">
        <div className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] p-2 rounded">
          <button className="bold text-sm sm:text-base">Nous contacter</button>
        </div>
      </Link>
    </section>
  );
}
