"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import ArrowBack from "./ArrowBack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QueryClientProvider from "./QueryClientProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

function Component(): React.JSX.Element | null {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch("/api/auth/is-authenticated");
      const data = await response.json();
      return data.isAuthenticated;
    },
    staleTime: 0,
    gcTime: 0,
    refetchInterval: 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    queryClient.invalidateQueries({ queryKey: ["auth"] });
    router.push("/connexion");
  };

  const showReturnArrowOn = ["/game", "/connexion", "/inscription"];
  const shouldShowReturnArrow = showReturnArrowOn.some((path) =>
    pathname?.startsWith(path)
  );

  const hideNavbarOn = ["/choice-character", "/menu"];
  const shouldHideNavbar = hideNavbarOn.some((path) => pathname === path);

  if (shouldHideNavbar) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <nav className="mx-4 sm:mx-6 mt-2">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 sm:justify-between">
        {shouldShowReturnArrow ? (
          <ArrowBack />
        ) : (
          <Link href="/">
            <Image
              src="/kt-logo.png"
              alt="Logo de KidsTrotter"
              height={140}
              width={140}
              className="w-24 sm:w-32 lg:w-[140px] h-auto"
            />
          </Link>
        )}

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-8">
              <button
                onClick={handleLogout}
                className="hover:opacity-80 transition-opacity"
                title="Se déconnecter"
              >
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  className="text-3xl text-[var(--secondary-color)] cursor-pointer"
                />
              </button>
              <UserAvatar />
            </div>
          ) : (
            <Link href="/connexion">
              <button className="w-full sm:w-auto bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] bold p-3 sm:p-4 rounded cursor-pointer text-sm sm:text-base">
                Se connecter/s&apos;inscrire
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <QueryClientProvider>
      <Component />
    </QueryClientProvider>
  );
}
