import { create } from "zustand";
// import data from "../../utils/list-of-houses.json";

// let housesData = await FetchData();
// console.log(housesData);
// let tenants = await FetchDataTenants();

// async function main() {
//   try {
//     const housesAndTenants = await FetchData();
//     console.log(housesAndTenants);
//     housesData = housesAndTenants.houses;
//     tenants = housesAndTenants.tenants;
//     return housesAndTenants;
//     // Faites quelque chose avec les données récupérées
//   } catch (error) {
//     console.error("Erreur lors de la récupération des données:", error);
//   }
// }

export const useRentBooklet = create(async (set) => {
  // Fonction pour récupérer les données des maisons et locataires depuis une API
  const fetchDataFromAPI = async () => {
    try {
      // Effectuez votre requête à l'API pour récupérer les données
      const response = await fetch(
        "https://tenents-management-api.onrender.com/data"
      );
      const data = await response.json();

      // Définissez les données récupérées dans le state
      set({ houses: data.houses, tenants: data.tenants });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données depuis l'API :",
        error
      );
    }
  };

  // Appelez la fonction pour récupérer les données lors de l'initialisation
  await fetchDataFromAPI();

  // Définissez les fonctions de mise à jour
  return {
    houses: [],
    tenants: [],
    updateHouses: (newHouse) => {
      set({ houses: newHouse });
    },
    updateTenants: (newTenants) => {
      console.log("Tenants: ", newTenants);
      set({ tenants: newTenants });
    },
  };
});
