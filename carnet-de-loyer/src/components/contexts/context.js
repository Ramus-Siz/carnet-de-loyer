import axios from "axios";
import { create } from "zustand";

export const useRentBooklet = create((set) => ({
  houses: [],
  tenants: [],
  currentUser: {
    id: "",
    username: "",
    email: "",
    role: "",
  },
  // Fonction pour récupérer les données des maisons et locataires depuis une API
  // fetchDataFromAPI: async () => {
  //   // Effectuez votre requête à l'API pour récupérer les données

  //   try {
  //     const response = await fetch(
  //       `https://tenents-management-api.onrender.com/users/${id}`
  //     );
  //     const data = await response.json();
  //     set({ houses: data.houses, tenants: data.tenants });
  //   } catch (error) {
  //     console.error(
  //       "Erreur lors de la récupération des données depuis l'API :",
  //       error
  //     );
  //   }
  // },
  updateHouses: (newHouse) => {
    set({
      houses: newHouse,
    });
  },
  updateTenants(newTenant) {
    set({
      tenants: newTenant,
    });
  },
  updateCurrentUser(newCurrentUser) {
    set({
      currentUser: newCurrentUser,
    });
  },
}));

// Appelez la fonction pour récupérer les données lors de l'initialisation

// Définissez les fonctions de mise à jour
