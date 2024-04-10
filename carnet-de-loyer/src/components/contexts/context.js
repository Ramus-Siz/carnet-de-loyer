import { create } from "zustand";
// import data from "../../utils/list-of-houses.json";
import FetchData from "../../utils/fetchData";
let housesData;
let tenants;

export const useRentBooklet = create(async (set) => ({
  housesAndTenants: await FetchData(),
  houses: [...housesAndTenants.houses],
  tenants: housesAndTenants.tenants,
  updateHouses: (newHouse) => {
    set({ houses: newHouse });
  },
  updateTenants: (newTenants) => {
    console.log("Tenants: ", newTenants);
    set({ tenants: newTenants });
  },
}));
