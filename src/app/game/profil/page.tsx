"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBack from "@/app/components/ArrowBack";

interface UserData {
  email: string;
  username: string;
  password: string;
  password_kids: string;
  created_at: string;
  currentPassword?: string; // Mot de passe actuel principal
  currentPassword_kids?: string; // Mot de passe actuel enfant
}

export default function CompteUser() {
  const router = useRouter();
  const [editable, setEditable] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [kidsPasswordError, setKidsPasswordError] = useState<string>("");
  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
    password: "",
    password_kids: "",
    created_at: "",
    currentPassword: "",
    currentPassword_kids: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        router.push('/connexion');
        return;
      }
      
      try {
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données utilisateur');
        }
        
        const data = await response.json();
        setUserData({
          email: data.email || "",
          username: data.username || "",
          password: "********",
          password_kids: "********",
          created_at: data.created_at || "",
          currentPassword: "",
          currentPassword_kids: "",
        });
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la récupération des données utilisateur');
      }
    };

    fetchData();
  }, [router]);

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
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        router.push('/connexion');
        return;
      }
      
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
        password?: string;
        password_kids?: string;
        currentPassword?: string;
        currentPassword_kids?: string;
      }
      
      // Initialiser avec les propriétés obligatoires
      const dataToSend: UpdateData = {
        email: userData.email,
        username: userData.username,
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
          return;
        }
        if (errorData.error === "invalid_kids_password") {
          setKidsPasswordError("Mot de passe enfant actuel incorrect");
          return;
        }
        throw new Error('Échec de la mise à jour des données utilisateur');
      }
      
      setEditable(false);
      
      const updatedUser = await response.json();
      setUserData({
        ...userData,
        email: updatedUser.email || userData.email,
        username: updatedUser.username || userData.username,
        password: '********',
        password_kids: '********',
        currentPassword: "",
        currentPassword_kids: "",
      });
      
      alert('Profil mis à jour avec succès !');
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <>
      <div className="bg-black/80 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mon Compte</h2>
          <ArrowBack />
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
            <p className="text-lg">{userData.created_at}</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleModifier}
            className="bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 px-12 rounded-full transition-colors cursor-pointer"
          >
            {editable ? 'Valider' : 'Modifier'}
          </button>
        </div>
      </div>
    </>
  );
}