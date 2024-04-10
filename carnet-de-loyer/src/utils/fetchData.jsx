import axios from "axios";

const FetchData = async () => {
  const { data } = await axios.get(
    `https://tenents-management-api.onrender.com/data`
  );
  const housesAndTenants = data;

  return housesAndTenants;
};

// let housesAndTenants = await getData();

export default FetchData;
