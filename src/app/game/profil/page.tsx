"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBack from "@/app/components/ArrowBack";

interface UserData {
  email: string;
  username: string;
  password: string;
  childPassword: string;
  created_at: string;
}

export default function CompteUser() {
  const router = useRouter();
  const [editable, setEditable] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
    password: "",
    childPassword: "",
    created_at: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupération de l'ID utilisateur depuis le localStorage
        const userId = localStorage.getItem('user_id');
        
        if (!userId) {
          // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
          router.push('/connexion');
          return;
        }
        
        // Appel à l'API pour récupérer les données utilisateur
        const response = await fetch(`/api/users/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error('Échec de la récupération des données utilisateur');
        }
        
        // Conversion de la réponse en JSON
        const user = await response.json();
        
        // Mise à jour de l'état avec les données utilisateur
        setUserData({
          email: user.email || '',
          username: user.username || '',
          password: '********', // On ne montre jamais le vrai mot de passe
          childPassword: '********', // On ne montre jamais le vrai mot de passe enfant
          created_at: new Date(user.created_at).toLocaleDateString('fr-FR') || '',
        });
        
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    // Appel de la fonction de récupération des données
    fetchUserData();
  }, [router]);

  const handleModifier = () => {
    // Si déjà en mode édition, alors on soumet les modifications
    if (editable) {
      handleSubmit();
    } else {
      // Sinon on passe en mode édition
      setEditable(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      
      if (!userId) {
        router.push('/connexion');
        return;
      }
      
      // Définir un type qui inclut toutes les propriétés possibles
      interface UpdateData {
        email: string;
        username: string;
        password?: string;
        childPassword?: string;
      }
      
      // Initialiser avec les propriétés obligatoires
      const dataToSend: UpdateData = {
        email: userData.email,
        username: userData.username,
      };
      
      // Ajout des mots de passe uniquement s'ils ont été modifiés
      if (userData.password !== '********') {
        dataToSend.password = userData.password;
      }
      
      if (userData.childPassword !== '********') {
        dataToSend.childPassword = userData.childPassword;
      }
      
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      
      if (!response.ok) {
        throw new Error('Échec de la mise à jour des données utilisateur');
      }
      
      setEditable(false);
      
      const updatedUser = await response.json();
      setUserData({
        ...userData,
        email: updatedUser.email || userData.email,
        username: updatedUser.username || userData.username,
        password: '********',
        childPassword: '********',
      });
      
      alert('Profil mis à jour avec succès !');
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour des données:', error);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <>
      <div className="absolute top-4 left-4">
        <img src="/kt-logo.png" alt="Logo KT" className="w-16 h-16" />
      </div>
      
      <div className="absolute top-20 left-16">
        <ArrowBack />
      </div>
      
      <div className="bg-black/80 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="rounded-full overflow-hidden w-24 h-24 border-2 border-teal-400">
            <img src="/avatar.png" alt="Avatar utilisateur" className="w-full h-full object-cover" />
          </div>
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
          
          <div className="flex justify-between items-center">
            <p className="text-lg">Mot de passe enfant :</p>
            {editable ? (
              <input
                type="password"
                name="childPassword"
                value={userData.childPassword}
                onChange={handleInputChange}
                placeholder="Nouveau mot de passe enfant"
                className="bg-gray-800 text-white rounded px-3 py-1"
              />
            ) : (
              <p className="text-lg">{userData.childPassword}</p>
            )}
          </div>
          
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