import axios from "axios";

const getData = async () => {
  const { data } = await axios.get(
    `https://tenents-management-api.onrender.com/data`
  );
  const housesAndTenants = data;

  return housesAndTenants;
};

let housesAndTenants = await getData();
console.log(housesAndTenants);

function FetchData() {
  return housesAndTenants;
}

export default FetchData;
