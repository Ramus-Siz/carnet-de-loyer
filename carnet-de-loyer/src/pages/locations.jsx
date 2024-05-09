import { useEffect, useState } from "react";
import { useRentBooklet } from "../components/contexts/context";
import Header from "../components/header";
import axios from "axios";
import Loader from "../components/loader";
import { BASE_API_URL } from "../utils/config";

export default function Locations() {
  let tenants = useRentBooklet((state) => state.tenants);
  let houses = useRentBooklet((state) => state.houses);
  const updateHouses = useRentBooklet((state) => state.updateHouses);

  const updateTenants = useRentBooklet((state) => state.updateTenants);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  const getUserConnected = sessionStorage.getItem("currentUser");
  const userConnected = JSON.parse(getUserConnected);
  const [tenantState, settenantState] = useState([]);

  const tenantUrl = `http://localhost:3000/my-tenants`;
  const userUrl = `${BASE_API_URL}/my-tenants/lessor/${userConnected.lessorId}`;

  const [data, setData] = useState({});
  const [tenantData, setTenanteData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let backgroundList;
  let thisHouse;
  const catalog = tenantData.map((tenant, index) => {
    {
      index % 2 == 0
        ? (backgroundList = "")
        : (backgroundList = "bg-[#a1a76a] text-white");
    }

    if (tenant.bails) {
      const getMyhouses = sessionStorage.getItem("myHouses");
      let houses = JSON.parse(getMyhouses);
      thisHouse = houses.find(
        (house) => house.id == tenant.bails[0].myPropertyId
      );
    }

    return (
      <tr
        key={tenant.id}
        className={`border border-1 border-[#5f6263] ${backgroundList}`}
      >
        <td className="border border-1 border-[#5f6263] p-4">{`${tenant.name} ${tenant.prenom}`}</td>
        <td className="border border-1 border-[#5f6263] p-4">{`${tenant.telephone}`}</td>

        {/* Si le locataire a des baux */}
        {tenant.bails && tenant.bails.length > 0 ? (
          <>
            <td className="border border-1 border-[#5f6263] p-4">{`${thisHouse.adress}`}</td>

            {/* Afficher la date de début du premier bail */}
            <td className="border border-1 border-[#5f6263] p-4">
              {tenant.bails[0].start}
            </td>
            {/* Afficher la date de fin du premier bail */}
            <td className="border border-1 border-[#5f6263] p-4">
              {tenant.bails[0].finish}
            </td>
            {/* Afficher l'état du locataire en fonction de la disponibilité des baux */}
            <td className="border border-1 border-[#5f6263] p-4">Actif</td>
          </>
        ) : (
          <>
            {/* Si le locataire n'a pas de contract */}
            <td className="border border-1 border-[#5f6263] p-4">{"-"}</td>
            <td className="border border-1 border-[#5f6263] p-4">{"-"}</td>
            <td className="border border-1 border-[#5f6263] p-4">Inactif</td>
          </>
        )}
      </tr>
    );
  });
  const getData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await axios.get(userUrl, {
        headers: {
          authorization: token,
        },
      });
      setTenanteData(data);
      updateTenants(data);
      setData(data);
    } catch (error) {
      console.log("locations", error);
      console.error("Erreur lors de la récupération des données:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [userConnected.lessorId]);
  return (
    <>
      <Header />
      {loading && (
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Loader />
        </div>
      )}

      {data && (
        <div className="p-1">
          <table className="border border-1 w-full text-[#b3b5b7] ">
            <thead>
              <tr className="bg-[#c299d0] text-white">
                <th className="border border-1 border-[#5f6263] p-4">
                  Locataire
                </th>
                <th className="border border-1 border-[#5f6263] p-4">
                  Téléphone
                </th>
                <th className="border border-1  border-[#5f6263] p-4">
                  Adresse
                </th>
                <th className="border border-1 border-[#5f6263] p-4">
                  Début du contrat
                </th>
                <th className="border border-1 border-[#5f6263] p-4">
                  Fin du contrat
                </th>
                <th className="border border-1  border-[#5f6263] p-4">Etat</th>
              </tr>
            </thead>
            <tbody className="border border-1 border-[#5f6263]">
              {catalog}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// {
//   <table border="1">
//     <thead>
//       <tr>
//         <th>Locataire</th>
//         <th>Téléphone</th>
//         <th>Adresse</th>
//         <th>Maison</th>
//         <th>Début du contrat</th>
//         <th>Fin du contrat</th>
//         <th>État</th>
//       </tr>
//     </thead>
//     <tbody>
//       {data.map((item, index) => (
//         <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
//           <td>{item.locataire}</td>
//           <td>{item.telephone}</td>
//           <td>{item.adresse}</td>
//           <td>{item.maison}</td>
//           <td>{item.debutContrat}</td>
//           <td>{item.finContrat}</td>
//           <td>{item.etat}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>;
// }
