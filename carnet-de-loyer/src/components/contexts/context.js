import { create } from "zustand";
import { FetchData, FetchDataTenants } from "../../utils/fetchData";
// import data from "../../utils/list-of-houses.json";

let housesData = await FetchData();
console.log(housesData);
let tenants = await FetchDataTenants();

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

export const useRentBooklet = create((set) => ({
  houses: [...housesData],
  tenants: [...tenants],
  updateHouses: (newHouse) => {
    set({ houses: newHouse });
  },
  updateTenants: (newTenants) => {
    console.log("Tenants: ", newTenants);
    set({ tenants: newTenants });
  },
}));
