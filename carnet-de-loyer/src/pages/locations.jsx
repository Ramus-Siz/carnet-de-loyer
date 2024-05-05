import { useEffect, useState } from "react";
import { useRentBooklet } from "../components/contexts/context";
import Header from "../components/header";
import axios from "axios";
import Loader from "../components/loader";

export default function Locations() {
  let tenants = useRentBooklet((state) => state.tenants);
  console.log(tenants);
  let houses = useRentBooklet((state) => state.houses);
  const updateHouses = useRentBooklet((state) => state.updateHouses);

  const updateTenants = useRentBooklet((state) => state.updateTenants);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  const [tenantState, settenantState] = useState([]);

  const tenantUrl = `https://tenents-management-api.onrender.com/my-tenants/${tenants[0].id}`;
  const userUrl = `https://tenents-management-api.onrender.com/my-tenants/lessor/${currentUser.lessorId}`;

  const [data, setData] = useState({});
  const [tenantData, setTenanteData] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(data);
  const catalog = (
    <tr className={`border border-1 border-[#5f6263]`}>
      <td className="border border-1  border-[#5f6263] p-4">{`${tenants[0].name} ${tenants[0].prenom}`}</td>
      <td className="border border-1 border-[#5f6263] p-4">{`${tenants[0].telephone}`}</td>
      <td className="border border-1 border-[#5f6263] p-4">{`${tenants[0].adress}`}</td>
      {tenantData.bails && tenantData.bails.length > 0 && (
        <>
          {/* const firstBail = data.bails[0]; */}
          <td className="border border-1 border-[#5f6263] p-4">
            {tenantData.bails[0].start}
          </td>
          {/* Afficher la date de fin du bail */}
          <td className="border border-1 border-[#5f6263] p-4">
            {tenantData.bails[0].finish}
          </td>
        </>
      )}
      <td className="border border-1 border-[#5f6263] p-4">Actif</td>
    </tr>
  );

  const getData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await axios.get(userUrl, {
        headers: {
          authorization: token,
        },
      });
      settenantState(data);
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
  const getTenantData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await axios.get(tenantUrl, {
        headers: {
          authorization: token,
        },
      });
      setTenanteData(data);
      setData(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (tenants && tenants.length > 0 && tenants[0].id) {
      getData();
      getTenantData();
    }
  }, [tenantData, currentUser.lessorId]);

  if (loading) {
    return (
      <>
        <Header />
        <div className=" flex justify-center items-center h-[70%]">
          <Loader />
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Header />
        <div className=" flex justify-center items-center h-[70%]">
          <Loader />
        </div>
      </>
    );
  }
  if (data) {
    return (
      <>
        <Header />
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
                  in du contrat
                </th>
                <th className="border border-1  border-[#5f6263] p-4">Etat</th>
              </tr>
            </thead>
            <tbody className="border border-1 border-[#5f6263]">
              {catalog}
            </tbody>
          </table>
        </div>
      </>
    );
  }
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
