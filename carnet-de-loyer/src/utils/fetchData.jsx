import axios from "axios";

export const FetchData = async () => {
  const { data } = await axios.get(
    `https://tenents-management-api.onrender.com/data/my-houses`
  );
  const housesAndTenants = data;

  return housesAndTenants;
};

export const FetchDataTenants = async () => {
  const { data } = await axios.get(
    `https://tenents-management-api.onrender.com/data/my-tenants`
  );
  const tenants = data;

  return tenants;
};

// let housesAndTenants = await getData();
