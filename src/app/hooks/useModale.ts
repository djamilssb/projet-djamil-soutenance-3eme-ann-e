"use client";

import { useState } from 'react';

export const useModale = () => {
  const [isModaleVisible, setIsModaleVisible] = useState(false);

  const openModale = () => {
    console.log('modale open');
    setIsModaleVisible(true);
  };

  const closeModale = () => {
    setIsModaleVisible(false);
  };

  return {
    isModaleVisible,
    openModale,
    closeModale,
  }
};
