"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBack from "@/app/components/ArrowBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import MenuAvatar from "./components/MenuAvatar";

interface UserData {
  email: string;
  username: string;
  password: string;
  password_kids: string;
  created_at: string;
  phone: string;
  address: string;
  avatar_id?: number;
  avatar_url?: string;
  currentPassword?: string;
  currentPassword_kids?: string;
}

export default function CompteUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [editable, setEditable] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [kidsPasswordError, setKidsPasswordError] = useState<string>("");
  const [showAvatarMenu, setShowAvatarMenu] = useState<boolean>(false);
  
  const [userData, setUserData] = useState<UserData>({
    email: "",
    username: "",
    password: "",
    password_kids: "",
    created_at: "",
    phone: "",
    address: "",
    avatar_id: 0,
    avatar_url: "/avatar-default.png",
    currentPassword: "",
    currentPassword_kids: "",
  });
  const [isPasswordModified, setIsPasswordModified] = useState(false);
  const [isKidsPasswordModified, setIsKidsPasswordModified] = useState(false);

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
        if (errorData.error === "invalid_current_password") {
          setPasswordError("Le mot de passe actuel est incorrect");
          throw new Error("invalid_current_password");
        }
        if (errorData.error === "invalid_current_kids_password") {
          setKidsPasswordError("Le mot de passe enfant actuel est incorrect");
          throw new Error("invalid_current_kids_password");
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
      setIsPasswordModified(false);
      setIsKidsPasswordModified(false);
    },
    onError: (error: any) => {
      if (error.message !== "invalid_current_password" && error.message !== "invalid_current_kids_password") {
        console.error('Erreur lors de la mise à jour des données:', error);
        alert('Erreur lors de la mise à jour du profil');
      }
    }
  });

  useEffect(() => {
    if (data) {
      const savedAvatarUrl = localStorage.getItem('user_avatar_url');
      const savedAvatarId = localStorage.getItem('user_avatar_id');
      
      setUserData({
        email: data.email || "",
        username: data.username || "",
        password: "********",
        password_kids: "********",
        created_at: data.created_at || "",
        phone: data.phone || "",
        address: data.address || "",
        avatar_id: savedAvatarId ? parseInt(savedAvatarId) : 1,
        avatar_url: savedAvatarUrl || "/avatar-default.png",
        currentPassword: "",
        currentPassword_kids: "",
      });
      
      setIsPasswordModified(false);
      setIsKidsPasswordModified(false);
    }
  }, [data]);

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
      setPasswordError("");
      setKidsPasswordError("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'password' && value !== '********') {
      setIsPasswordModified(true);
    }
    
    if (name === 'password_kids' && value !== '********') {
      setIsKidsPasswordModified(true);
    }
    
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarSelect = (avatarId: number, avatarUrl: string) => {
    setUserData({
      ...userData,
      avatar_id: avatarId,
      avatar_url: avatarUrl
    });
    
    localStorage.setItem('user_avatar_url', avatarUrl);
    localStorage.setItem('user_avatar_id', avatarId.toString());
    
    setShowAvatarMenu(false);
  };

  const handleSubmit = async () => {
    try {
      setPasswordError("");
      setKidsPasswordError("");
      
      const isPasswordChanged = userData.password !== '********';
      const isKidsPasswordChanged = userData.password_kids !== '********';
      
      if (isPasswordChanged && (!userData.currentPassword || userData.currentPassword.trim() === "")) {
        setPasswordError("Veuillez entrer votre mot de passe actuel pour confirmer le changement");
        return;
      }
      
      if (isKidsPasswordChanged && (!userData.currentPassword_kids || userData.currentPassword_kids.trim() === "")) {
        setKidsPasswordError("Veuillez entrer le mot de passe enfant actuel pour confirmer le changement");
        return;
      }

      interface UpdateData {
        email: string;
        username: string;
        phone: string;
        address: string;
        avatar_id?: number;
        password?: string;
        password_kids?: string;
        currentPassword?: string;
        currentPassword_kids?: string;
      }
      
      const dataToSend: UpdateData = {
        email: userData.email,
        username: userData.username,
        phone: userData.phone,
        address: userData.address,
        avatar_id: userData.avatar_id
      };
      
      if (isPasswordChanged) {
        dataToSend.password = userData.password;
        dataToSend.currentPassword = userData.currentPassword;
      }
      
      if (isKidsPasswordChanged) {
        dataToSend.password_kids = userData.password_kids;
        dataToSend.currentPassword_kids = userData.currentPassword_kids;
      }
      
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-400"></div>
      </div>
    );
  }

  return (
    <>
      {showAvatarMenu && (
        <MenuAvatar 
          onAvatarSelect={handleAvatarSelect}
          onClose={() => setShowAvatarMenu(false)}
        />
      )}
      
      <div className="absolute top-5 left-5">
        <ArrowBack />
      </div>
      <div className="bg-black/80 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mon Compte</h2>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 rounded-full overflow-hidden mb-3">
            <Image
              src={userData.avatar_url || "avatar-default.png"}
              alt="Avatar utilisateur"
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "avatar-default.png";
              }}
            />
          </div>
          
          {editable && (
            <button 
              onClick={() => setShowAvatarMenu(true)}
              className="bg-transparent border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-black cursor-pointer"
            >
              Modifier l&apos;avatar
            </button>
          )}
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
          
          {!editable && (
            <div className="flex justify-between items-center">
              <p className="text-lg">Mot de passe :</p>
              <p className="text-lg">{userData.password}</p>
            </div>
          )}
          
          {editable && (
            <>
              {isPasswordModified && (
                <div className="flex justify-between items-center">
                  <p className="text-lg">Mot de passe actuel :</p>
                  <input
                    type="password"
                    name="currentPassword"
                    value={userData.currentPassword || ""}
                    onChange={handleInputChange}
                    placeholder="Tapez exactement votre mot de passe actuel"
                    className="bg-gray-800 text-white rounded px-3 py-1"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <p className="text-lg">{isPasswordModified ? "Nouveau mot de passe :" : "Mot de passe :"}</p>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  placeholder="Nouveau mot de passe"
                  className="bg-gray-800 text-white rounded px-3 py-1"
                />
              </div>
              
              {passwordError && (
                <div className="text-red-500 text-center">{passwordError}</div>
              )}
            </>
          )}
          
          {!editable && (
            <div className="flex justify-between items-center">
              <p className="text-lg">Mot de passe enfant :</p>
              <p className="text-lg">{userData.password_kids}</p>
            </div>
          )}
          
          {editable && (
            <>
              {isKidsPasswordModified && (
                <div className="flex justify-between items-center">
                  <p className="text-lg">Mot de passe enfant actuel :</p>
                  <input
                    type="password"
                    name="currentPassword_kids"
                    value={userData.currentPassword_kids || ""}
                    onChange={handleInputChange}
                    placeholder="Tapez exactement le mot de passe enfant actuel"
                    className="bg-gray-800 text-white rounded px-3 py-1"
                  />
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <p className="text-lg">{isKidsPasswordModified ? "Nouveau mot de passe enfant :" : "Mot de passe enfant :"}</p>
                <input
                  type="password"
                  name="password_kids"
                  value={userData.password_kids}
                  onChange={handleInputChange}
                  placeholder="Nouveau mot de passe enfant"
                  className="bg-gray-800 text-white rounded px-3 py-1"
                />
              </div>
              
              {kidsPasswordError && (
                <div className="text-red-500 text-center">{kidsPasswordError}</div>
              )}
            </>
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