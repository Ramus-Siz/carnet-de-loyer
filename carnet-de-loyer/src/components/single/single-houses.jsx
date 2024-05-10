import { useParams } from "react-router-dom";
import Header from "../header";
import { useRentBooklet } from "../contexts/context";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../utils/config";
import Loader from "../loader";

export default function SinglePreviewHouses() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [houseData, setHouseData] = useState([]);
  const { id } = useParams();
  const listHouses = useRentBooklet((state) => state.houses);
  const houseURL = `${BASE_API_URL}/my-houses/${id}`;
  console.log("houseData: ", houseData);

  // const houses = listHouses.find((house) => house.id === +id);
  let isTenant = false;

  const catalog = (
    <>
      <div className="flex flex-col w-full gap-8 p-8">
        <div className="flex gap-4 items-center">
          <span className="text-fuchsia-700  text-xl">
            <ion-icon name="home-outline"></ion-icon>
          </span>
          <h2 className="text-white font-semibold">
            {`Maison sur ${houseData.adress}`}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-[#b3b5b7] table-auto text-center border-collapse border border-[#b3b5b7]">
            <thead>
              <tr>
                <th scope="col" className="p-8 border border-[#b3b5b7]">
                  Type
                </th>
                <th scope="col" className="p-8 border border-[#b3b5b7]">
                  Adresse
                </th>
                <th scope="col" className="p-8 border border-[#b3b5b7]">
                  Composition
                </th>
                <th scope="col" className="p-8 border border-[#b3b5b7]">
                  Locataire
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-8 border border-slate-300">
                  {houseData.type}
                </td>
                <td className="p-8 border border-slate-300">
                  {houseData.adress}
                </td>
                <td className="p-8 border border-slate-300">
                  {houseData.composition}
                </td>
                <td className="p-8 border border-slate-300">
                  {houseData.bails && houseData.bails.length ? "Oui" : "Non"}
                </td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>

        <div className="flex flex-col gap-4 w-[90%] ">
          <h2 className="font-semibold text-white ">Description:</h2>
          <p className="text-[#b3b5b7]">{houseData.description}</p>
        </div>
      </div>
    </>
  );

  const getHousesData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(houseURL, {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 201) {
        setData(response.data);
        setHouseData(response.data);
      }
    } catch (error) {
      setError(error);
      console.error("Erreur lors de la récupération des données:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getHousesData();
  }, []);

  return (
    <>
      <Header />
      {loading && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
      {error && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Loader />
        </div>
      )}
      {data && <>{catalog}</>}
    </>
  );
}
