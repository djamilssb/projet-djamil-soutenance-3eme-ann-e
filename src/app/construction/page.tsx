import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page en construction - KidsTrotter",
  description: "Cette page est actuellement en cours de développement.",
};

export default function ConstructionPage(): React.JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
      <div className="bg-black bg-opacity-80 rounded-lg p-6 text-center max-w-md w-full shadow-2xl">
        <h1 className="text-white text-2xl font-bold mb-4">
          🚧 Page en cours de construction 🚧
        </h1>
        
        <p className="text-white text-base mb-6">
          Cette page est actuellement en développement.
          <br />
          Revenez bientôt pour découvrir cette fonctionnalité !
        </p>
        
        <Link href="/accueil">
          <button className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Retour à l&apos;accueil
          </button>
        </Link>
      </div>
    </div>
  );
}