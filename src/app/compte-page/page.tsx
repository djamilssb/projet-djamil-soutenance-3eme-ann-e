"use client";

import React, { useEffect, useState } from "react";
import ArrowBack from "../components/ArrowBack";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  username: string;
  password: string;
  childPassword: string;
  creationDate: string;
  _password?: string;
  _childPassword?: string;
}

export default function CompteUser() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    email: "didi.heko@gmail.com",
    username: "London2012",
    password: "**********",
    childPassword: "**********",
    creationDate: "22/09/20",
  });

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      
      setUserData({
        ...parsedData,
        password: "**********",
        childPassword: "**********",
      });
    }
  }, []);

  const handleModifier = () => {
    router.push("/modifier-compte");
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
            <p className="text-lg">{userData.email}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-lg">Nom d'utilisateur :</p>
            <p className="text-lg">{userData.username}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-lg">Mot de passe :</p>
            <p className="text-lg">**********</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-lg">Mot de passe enfant :</p>
            <p className="text-lg">**********</p>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-lg">Date de création :</p>
            <p className="text-lg">{userData.creationDate}</p>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleModifier}
            className="bg-teal-400 hover:bg-teal-500 text-black font-bold py-2 px-12 rounded-full transition-colors cursor-pointer"
          >
            Modifier
          </button>
        </div>
      </div>
    </>
  );
}