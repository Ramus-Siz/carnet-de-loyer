import { create } from "zustand";
// import data from "../../utils/list-of-houses.json";
import FetchData from "../../utils/fetchData";
let data = FetchData();
const housesData = data.houses;
const tenants = data.tenants;

export const useRentBooklet = create((set) => ({
  houses: [...housesData],
  tenants: tenants,
  updateHouses: (newHouse) => {
    set({ houses: newHouse });
  },
  updateTenants: (newTenants) => {
    console.log("Tenants: ", newTenants);
    set({ tenants: newTenants });
  },
}));
