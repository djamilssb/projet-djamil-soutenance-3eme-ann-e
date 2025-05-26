"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBack from "@/app/components/ArrowBack";

interface UserData {
  email: string;
  username: string;
  password: string;
  childPassword: string;
  _password?: string;
  _childPassword?: string;
  newPassword?: string;
  newChildPassword?: string;
  creationDate: string;
}

export default function ModifierCompte() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserData>({
    email: "",
    username: "",
    password: "",
    childPassword: "",
    newPassword: "",
    newChildPassword: "",
    creationDate: "",
  });
  
  const [placeholderData, setPlaceholderData] = useState({
    email: "",
    username: "",
  });
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentChildPassword, setCurrentChildPassword] = useState("");
  
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmNewChildPassword, setConfirmNewChildPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setFormData({
        ...parsedData,
        _password: parsedData._password || parsedData.password,
        _childPassword: parsedData._childPassword || parsedData.childPassword,
        newPassword: "",
        newChildPassword: "",
      });
      
      // Définir les placeholders depuis les données sauvegardées
      setPlaceholderData({
        email: parsedData.email,
        username: parsedData.username,
      });
    } else {
      // Définir les placeholders par défaut
      setPlaceholderData({
        email: "didi.heko@gmail.com",
        username: "London2012",
      });
      
      setFormData({
        email: "",
        username: "",
        password: "",
        childPassword: "",
        _password: "********",
        _childPassword: "********",
        newPassword: "",
        newChildPassword: "",
        creationDate: "22/09/20",
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCurrentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleCurrentChildPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentChildPassword(e.target.value);
  };

  const handleConfirmNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleConfirmNewChildPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewChildPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (formData.newPassword && currentPassword !== formData._password) {
      setError("Le mot de passe actuel est incorrect");
      return;
    }
    
    if (formData.newChildPassword && currentChildPassword !== formData._childPassword) {
      setError("Le mot de passe enfant actuel est incorrect");
      return;
    }
    
    if (formData.newPassword && formData.newPassword !== confirmNewPassword) {
      setError("Le nouveau mot de passe et sa confirmation ne correspondent pas");
      return;
    }
    
    if (formData.newChildPassword && formData.newChildPassword !== confirmNewChildPassword) {
      setError("Le nouveau mot de passe enfant et sa confirmation ne correspondent pas");
      return;
    }
    
    // Utiliser les placeholders si les champs sont vides
    const dataToSave = {
      email: formData.email || placeholderData.email,
      username: formData.username || placeholderData.username,
      password: "**********",
      childPassword: "**********",
      _password: formData.newPassword || formData._password, 
      _childPassword: formData.newChildPassword || formData._childPassword,
      creationDate: formData.creationDate,
    };
    
    localStorage.setItem("userData", JSON.stringify(dataToSave));
    
    router.push("/page-compte");
  };

  return (
    <div>
      
      <div className="absolute top-8 left-8">
        <ArrowBack />
      </div>
      
      <div className="bg-black/80 text-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div className="col-span-2 flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Modifier mes informations</h1>
            <div className="rounded-full overflow-hidden w-20 h-20">
              <img src="/avatar.png" alt="Avatar utilisateur" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {error && (
            <div className="col-span-2 bg-red-500/20 border border-red-500 text-white p-2 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div className="flex items-center">
              <label htmlFor="email" className="w-48">Mail :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={placeholderData.email}
                className="bg-gray-800/50 text-white px-3 py-2 rounded flex-1"
                required
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="username" className="w-48">Nom d'utilisateur :</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={placeholderData.username}
                className="bg-gray-800/50 text-white px-3 py-2 rounded flex-1"
                required
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="currentPassword" className="w-48">Mot de passe actuel :</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                placeholder="********"
                className="bg-gray-800/50 text-white px-3 py-2 rounded flex-1"
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="newPassword" className="w-48">Nouveau mot de passe :</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Nouveau mot de passe"
                className="bg-gray-800/50 text-white px-3 py-2 rounded flex-1"
                disabled={!currentPassword} // Désactiver tant que le mot de passe actuel n'est pas saisi
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="confirmNewPassword" className="w-48">Retaper le nouveau mot de passe :</label>
              <input
                type="password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleConfirmNewPasswordChange}
                placeholder="Confirmation du mot de passe"
                className="bg-gray-800/50 text-white px-3 py-2 rounded flex-1"
                disabled={!currentPassword}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center h-[41px]">

            </div>
            
            <div className="flex items-center h-[41px]">

            </div>
            
            <div className="flex items-center">
              <label htmlFor="currentChildPassword" className="w-48">Mot de passe enfant actuel :</label>
              <input
                type="password"
                id="currentChildPassword"
                value={currentChildPassword}
                onChange={handleCurrentChildPasswordChange}
                placeholder="********"
                className="bg-gray-800/50 text-white px-3 py-2 rounded flex-1"
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="newChildPassword" className="w-48">Nouveau mot de passe enfant :</label>
              <input
                type="password"
                id="newChildPassword"
                name="newChildPassword"
                value={formData.newChildPassword}
                onChange={handleChange}
                placeholder="Nouveau mot de passe enfant"
                className="bg-gray-800/50 text-white px-3 py-2 rounded flex-1"
                disabled={!currentChildPassword}
              />
            </div>
            
            <div className="flex items-center">
              <label htmlFor="confirmNewChildPassword" className="w-48">Retaper nouveau mot de passe enfant :</label>
              <input
                type="password"
                id="confirmNewChildPassword"
                value={confirmNewChildPassword}
                onChange={handleConfirmNewChildPasswordChange}
                placeholder="Confirmation du mot de passe enfant"
                className="bg-gray-800/50 text-white px-3 py-2 rounded flex-1"
                disabled={!currentChildPassword}
              />
            </div>
          </div>
          
          <div className="col-span-2 flex justify-center mt-8">
            <button 
              type="submit"
              className="bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 px-12 rounded-full transition-colors cursor-pointer"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}