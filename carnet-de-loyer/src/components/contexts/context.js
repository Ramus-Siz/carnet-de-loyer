import axios from "axios";
import { useEffect } from "react";
import { create } from "zustand";
import Logo from "../logo";

export const useRentBooklet = create((set) => ({
  houses: [],
  tenants: [],
  // Fonction pour récupérer les données des maisons et locataires depuis une API
  fetchDataFromAPI: async () => {
    // Effectuez votre requête à l'API pour récupérer les données

    try {
      const response = await fetch(
        `https://tenents-management-api.onrender.com/data`
      );
      const data = await response.json();
      set({ houses: data.houses, tenants: data.tenants });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données depuis l'API :",
        error
      );
    }
  },
  updateHouses: (newHouse) => {
    set((state) => ({
      houses: [...state.houses, newHouse],
    }));
  },
  updateTenants: (newTenant) => {
    set((state) => ({
      tenants: [...state.tenants, newTenant],
    }));
  },
}));

useRentBooklet.getState().fetchDataFromAPI();

// Appelez la fonction pour récupérer les données lors de l'initialisation

// Définissez les fonctions de mise à jour
