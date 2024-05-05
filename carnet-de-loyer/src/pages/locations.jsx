import { useEffect, useState } from "react";
import { useRentBooklet } from "../components/contexts/context";
import Header from "../components/header";
import axios from "axios";
import Loader from "../components/loader";

export default function Locations() {
  let tenants = useRentBooklet((state) => state.tenants);
  let houses = useRentBooklet((state) => state.houses);
  const updateHouses = useRentBooklet((state) => state.updateHouses);

  const updateTenants = useRentBooklet((state) => state.updateTenants);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  const userUrl = `http://localhost:3000/my-tenants/lessor/${currentUser.lessorId}`;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const catalog = tenants.map((tenant, index) => {
    const backgroundClass = index % 2 !== 0 ? "bg-[#b7bf7f] text-white" : "";
    let startDate = "";
    let endDate = "";

    if (tenant.bails && tenant.bails.length > 0) {
      const firstBail = tenant.bails[0]; // Choisissez un bail (ici, le premier bail)
      console.log(fir);

      // Accédez à startDate et endDate
      startDate = firstBail.start || "";
      endDate = firstBail.finish || "";
    }
    return (
      <tr
        key={tenant.id || index}
        className={`border border-1 border-[#5f6263] ${backgroundClass}`}
      >
        <td className="border border-1  border-[#5f6263] p-4">{`${tenant.name} ${tenant.prenom}`}</td>
        <td className="border border-1 border-[#5f6263] p-4">{`${tenant.telephone}`}</td>
        <td className="border border-1 border-[#5f6263] p-4">{`${tenant.adress}`}</td>
        <td className="border border-1 border-[#5f6263] p-4">{`${startDate}`}</td>
        <td className="border border-1 border-[#5f6263] p-4">{`${endDate}`}</td>
        <td className="border border-1 border-[#5f6263] p-4">Actif</td>
      </tr>
    );
  });
  const getHouseData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await axios.get(userUrl, {
        headers: {
          authorization: `${token}`,
        },
      });

      updateHouses(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };
  const getTenantData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const { data } = await axios.get(userUrl, {
        headers: {
          authorization: `${token}`,
        },
      });

      updateTenants(data);
      setData(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getTenantData();
    getHouseData();
  }, [currentUser.lessorId, updateCurrentUser]);

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
                <th className="border border-1 border-[#5f6263] p-4">Maison</th>
                <th className="border border-1 border-[#5f6263] p-4">
                  Début du contrat
                </th>
                <th className="border border-1  border-[#5f6263] p-4">
                  Fin du contrat
                </th>
                <th className="border border-1 border-[#5f6263] p-4">État</th>
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
