// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function AdventureButton(): React.JSX.Element {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     checkAuthStatus();
//   }, []);

//   const checkAuthStatus = async (): Promise<void> => {
//     try {
//       setIsLoading(true);
      
//       // Tentative de récupération du token via l'API
//       const tokenResponse = await fetch('/api/auth/token-id', {
//         method: 'GET',
//         credentials: 'include', // Inclure les cookies
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       // Vérifier le statut de la réponse
//       if (tokenResponse.ok) {
//         try {
//           const data = await tokenResponse.json();
//           if (data && (data.userId || data.id)) {
//             setIsAuthenticated(true);
//           } else {
//             setIsAuthenticated(false);
//           }
//         } catch (jsonError) {
//           // non connecté
//           setIsAuthenticated(false);
//         }
//       } else if (tokenResponse.status === 401 || tokenResponse.status === 403) {
//         // Statuts attendus pour un utilisateur non connecté
//         setIsAuthenticated(false);
//       } else if (tokenResponse.status === 500) {
//         console.warn('utilisateur non connecté');
//         setIsAuthenticated(false);
//       } else {
//         // Autres erreurs
//         setIsAuthenticated(false);
//       }
//     } catch (error) {
//       // Erreurs réseau ou autres
//       // Ne pas logger en tant qu'erreur car c'est un comportement normal
//       setIsAuthenticated(false);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClick = (): void => {
//     if (isAuthenticated) {
//       // Utilisateur connecté → Menu de jeu
//       router.push('/game/menu');
//     } else {
//       // Utilisateur non connecté → Page de connexion
//       router.push('/connexion');
//     }
//   };

//   // Affichage pendant le chargement
//   if (isLoading) {
//     return (
//       <button 
//         disabled
//         className="bg-gray-400 text-black text-sm sm:text-base lg:text-lg xl:text-xl font-bold px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg mt-4 opacity-70"
//       >
//         Chargement...
//       </button>
//     );
//   }

//   return (
//     <button 
//       onClick={handleClick}
//       className="bg-[var(--secondary-color)] hover:bg-[var(--hover-secondary)] text-black text-sm sm:text-base lg:text-lg xl:text-xl font-bold px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-4"
//     >
//       {isAuthenticated ? 'Continuer l\'aventure' : 'Commencer l\'aventure'}
//     </button>
//   );
// }