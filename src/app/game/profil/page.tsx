"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBack from "@/app/components/ArrowBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UserData {
  email: string;
  username: string;
  password: string;
  password_kids: string;
  created_at: string;
  phone: string;       // Ajout du numéro de téléphone
  address: string;     // Ajout de l'adresse
  currentPassword?: string;
  currentPassword_kids?: string;
}

export default function CompteUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editable, setEditable] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [kidsPasswordError, setKidsPasswordError] = useState<string>("");
  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
    password: "",
    password_kids: "",
    created_at: "",
    phone: "",        // Initialisation du champ téléphone
    address: "",      // Initialisation du champ adresse
    currentPassword: "",
    currentPassword_kids: "",
  });

  // Récupérer les données utilisateur avec TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        router.push('/connexion');
        throw new Error('Non authentifié');
      }
      
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }
      
      return await response.json();
    }
  });

  // Mutation pour mettre à jour les données utilisateur
  const updateUserMutation = useMutation({
    mutationFn: async (dataToSend: any) => {
      const userId = localStorage.getItem('user_id');
      if (!userId) throw new Error('Non authentifié');
      
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "invalid_password") {
          setPasswordError("Mot de passe actuel incorrect");
          throw new Error("invalid_password");
        }
        if (errorData.error === "invalid_kids_password") {
          setKidsPasswordError("Mot de passe enfant actuel incorrect");
          throw new Error("invalid_kids_password");
        }
        throw new Error('Échec de la mise à jour des données utilisateur');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      setEditable(false);
      queryClient.invalidateQueries({ queryKey: ['userData'] });
      alert('Profil mis à jour avec succès !');
      setUserData(prevData => ({
        ...prevData,
        password: '********',
        password_kids: '********',
        currentPassword: "",
        currentPassword_kids: "",
      }));
    },
    onError: (error: any) => {
      if (error.message !== "invalid_password" && error.message !== "invalid_kids_password") {
        console.error('Erreur lors de la mise à jour des données:', error);
        alert('Erreur lors de la mise à jour du profil');
      }
    }
  });

  // Mettre à jour l'état local avec les données de l'API
  useEffect(() => {
    if (data) {
      setUserData({
        email: data.email || "",
        username: data.username || "",
        password: "********",
        password_kids: "********",
        created_at: data.created_at || "",
        phone: data.phone || "",      // Récupération du téléphone
        address: data.address || "",  // Récupération de l'adresse
        currentPassword: "",
        currentPassword_kids: "",
      });
    }
  }, [data]);

  // Redirection en cas d'erreur
  useEffect(() => {
    if (isError) {
      router.push('/connexion');
    }
  }, [isError, router]);

  const handleModifier = () => {
    if (editable) {
      handleSubmit();
    } else {
      setEditable(true);
      // Réinitialiser les messages d'erreur lors du passage en mode édition
      setPasswordError("");
      setKidsPasswordError("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Réinitialisation des erreurs
      setPasswordError("");
      setKidsPasswordError("");
      
      // Vérification des modifications de mot de passe
      const isPasswordChanged = userData.password !== '********';
      const isKidsPasswordChanged = userData.password_kids !== '********';
      
      // Vérification du mot de passe principal si modifié
      if (isPasswordChanged && (!userData.currentPassword || userData.currentPassword.trim() === "")) {
        setPasswordError("Veuillez entrer votre mot de passe actuel pour confirmer le changement");
        return;
      }
      
      // Vérification du mot de passe enfant si modifié
      if (isKidsPasswordChanged && (!userData.currentPassword_kids || userData.currentPassword_kids.trim() === "")) {
        setKidsPasswordError("Veuillez entrer le mot de passe enfant actuel pour confirmer le changement");
        return;
      }
      
      // Définir un type qui inclut toutes les propriétés possibles
      interface UpdateData {
        email: string;
        username: string;
        phone: string;     // Ajout du téléphone dans les données à envoyer
        address: string;   // Ajout de l'adresse dans les données à envoyer
        password?: string;
        password_kids?: string;
        currentPassword?: string;
        currentPassword_kids?: string;
      }
      
      // Initialiser avec les propriétés obligatoires
      const dataToSend: UpdateData = {
        email: userData.email,
        username: userData.username,
        phone: userData.phone,     // Inclure le téléphone dans les données à envoyer
        address: userData.address  // Inclure l'adresse dans les données à envoyer
      };
      
      // Ajout des mots de passe uniquement s'ils ont été modifiés
      if (isPasswordChanged) {
        dataToSend.password = userData.password;
        dataToSend.currentPassword = userData.currentPassword;
      }
      
      if (isKidsPasswordChanged) {
        dataToSend.password_kids = userData.password_kids;
        dataToSend.currentPassword_kids = userData.currentPassword_kids;
      }
      
      // Utiliser la mutation pour mettre à jour les données
      updateUserMutation.mutate(dataToSend);
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
      });
    } catch (error) {
      console.error('Erreur lors du formatage de la date:', error);
      return dateString;
    }
  };

  // Afficher un spinner pendant le chargement
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400"></div>
      </div>
    );
  }

  return (
    <>
      {/* ArrowBack déplacé en dehors du carré */}
      <div className="absolute top-5 left-5">
        <ArrowBack />
      </div>
      <div className="bg-black/80 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mon Compte</h2>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <p className="text-lg">Mail :</p>
            {editable ? (
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="bg-gray-800 text-white rounded px-3 py-1"
              />
            ) : (
              <p className="text-lg">{userData.email}</p>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-lg">Nom d'utilisateur :</p>
            {editable ? (
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                className="bg-gray-800 text-white rounded px-3 py-1"
              />
            ) : (
              <p className="text-lg">{userData.username}</p>
            )}
          </div>
          
          {/* Section téléphone - Nouveau champ ajouté */}
          <div className="flex justify-between items-center">
            <p className="text-lg">Téléphone :</p>
            {editable ? (
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                placeholder="Numéro de téléphone"
                className="bg-gray-800 text-white rounded px-3 py-1"
              />
            ) : (
              <p className="text-lg">{userData.phone || "Non renseigné"}</p>
            )}
          </div>
          
          {/* Section adresse - Nouveau champ ajouté */}
          <div className="flex justify-between items-center">
            <p className="text-lg">Adresse :</p>
            {editable ? (
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                placeholder="Votre adresse"
                className="bg-gray-800 text-white rounded px-3 py-1"
              />
            ) : (
              <p className="text-lg">{userData.address || "Non renseignée"}</p>
            )}
          </div>
          
          {/* Section mot de passe principal */}
          <div className="flex justify-between items-center">
            <p className="text-lg">Mot de passe :</p>
            {editable ? (
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                placeholder="Nouveau mot de passe"
                className="bg-gray-800 text-white rounded px-3 py-1"
              />
            ) : (
              <p className="text-lg">{userData.password}</p>
            )}
          </div>
          
          {editable && userData.password !== "********" && (
            <div className="flex justify-between items-center">
              <p className="text-lg">Mot de passe actuel :</p>
              <input
                type="password"
                name="currentPassword"
                value={userData.currentPassword || ""}
                onChange={handleInputChange}
                placeholder="Requis pour validation"
                className="bg-gray-800 text-white rounded px-3 py-1"
              />
            </div>
          )}
          
          {passwordError && (
            <div className="text-red-500 text-center">{passwordError}</div>
          )}
          
          {/* Section mot de passe enfant */}
          <div className="flex justify-between items-center">
            <p className="text-lg">Mot de passe enfant :</p>
            {editable ? (
              <input
                type="password"
                name="password_kids"
                value={userData.password_kids}
                onChange={handleInputChange}
                placeholder="Nouveau mot de passe enfant"
                className="bg-gray-800 text-white rounded px-3 py-1"
              />
            ) : (
              <p className="text-lg">{userData.password_kids}</p>
            )}
          </div>
          
          {editable && userData.password_kids !== "********" && (
            <div className="flex justify-between items-center">
              <p className="text-lg">Mot de passe enfant actuel :</p>
              <input
                type="password"
                name="currentPassword_kids"
                value={userData.currentPassword_kids || ""}
                onChange={handleInputChange}
                placeholder="Requis pour validation"
                className="bg-gray-800 text-white rounded px-3 py-1"
              />
            </div>
          )}
          
          {kidsPasswordError && (
            <div className="text-red-500 text-center">{kidsPasswordError}</div>
          )}
          
          <div className="flex justify-between items-center">
            <p className="text-lg">Date de création :</p>
            <p className="text-lg">{formatDate(userData.created_at)}</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleModifier}
            disabled={updateUserMutation.isPending}
            className={`bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 px-12 rounded-full transition-colors cursor-pointer ${updateUserMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {updateUserMutation.isPending ? 'Chargement...' : editable ? 'Valider' : 'Modifier'}
          </button>
        </div>
      </div>
    </>
  );
}