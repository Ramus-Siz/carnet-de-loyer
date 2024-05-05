import { useEffect, useState } from "react";
import CheckBox from "../../components/checkbox";
import Header from "../../components/header";
import Options from "../../components/options";
import { Link } from "react-router-dom";
import { useRentBooklet } from "../../components/contexts/context";
import axios from "axios";
import Loader from "../../components/loader";

export default function MyHouses() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let houses = useRentBooklet((state) => state.houses);
  const updateHouses = useRentBooklet((state) => state.updateHouses);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const userUrl = `https://tenents-management-api.onrender.com/my-tenants/lessor/${currentUser.lessorId}`;

  const [isTrueToAddData, setIsTrueToAddData] = useState(false);

  console.log("Mhouses: ", houses);

  const HandleAddData = () => {
    setIsTrueToAddData(!isTrueToAddData);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState({
    choises: [],
  });

  const [list, setList] = useState([]);

  const HandleDelete = async () => {
    // Créez une copie de `houses` pour éviter de modifier directement l'état original
    let housesAfterDelete = [...houses];

    if (selectAll) {
      try {
        const token = sessionStorage.getItem("token");
        for (const house of housesAfterDelete) {
          const response = await axios.post(
            `https://tenents-management-api.onrender.com/my-houses/delete/${house.id}`,
            {
              headers: {
                authorization: token,
              },
            }
          );
        }

        housesAfterDelete = [];
        setIsCheck({ choises: [] });
        setSelectAll(false);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    } else {
      try {
        const token = sessionStorage.getItem("token");

        for (const choiceId of isCheck.choises) {
          // Envoyez une requête DELETE à l'API pour chaque maison sélectionnée
          await axios.delete(
            `https://tenents-management-api.onrender.com/my-houses/delete/${choiceId}`,
            {
              headers: {
                authorization: token,
              },
            }
          );
          // Filtrer `tenants` pour supprimer les houses sélectionnés
          housesAfterDelete = housesAfterDelete.filter(
            (house) => house.id !== choiceId
          );
        }

        updateHouses(housesAfterDelete);
        setIsCheck({ choises: [] });
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

  const handleSelectAll = (e) => {
    setSelectAll(!selectAll);
    setIsCheck({ choises: houses.map((li) => li.id) });
    if (selectAll) {
      setIsCheck({ choises: [] });
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    const idInt = parseInt(id, 10); // Convertir l'ID en nombre entier
    const { choises: reponses } = isCheck;

    if (checked) {
      // Ajoutez l'ID à la liste de choix
      setIsCheck({ choises: [...reponses, idInt] });
    } else {
      // Supprimez l'ID de la liste de choix
      setIsCheck({ choises: reponses.filter((item) => item !== idInt) });
    }
  };

  console.log(isCheck.choises);

  const catalog = houses.map(({ id, adress }) => {
    return (
      <div key={id}>
        <div className="flex gap-4 p-3 justify-between text-[#b3b5b7] pl-8 shadow-xl  w-full hover:scale-95 ">
          <div className="flex gap-4">
            <CheckBox
              name={adress}
              key={id}
              type="checkbox"
              id={id}
              isChecked={isCheck.choises.includes(id)}
              handleClick={handleClick}
            />
            {adress}
          </div>
          <Link to={`/my-houses/${id}`}>
            <span className="justify-self-end pr-2 text-fuchsia-700">
              <ion-icon name="eye-outline"></ion-icon>
            </span>
          </Link>
        </div>
      </div>
    );
  });

  const getHousesData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${userUrl}`, {
        headers: {
          authorization: `${token}`,
        },
      });
      updateHouses(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  //re set the list of house
  useEffect(() => {
    getHousesData();
  }, [currentUser.lessorId, updateCurrentUser]);

  if (loading) {
    return (
      <>
        <Header />
        <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Loader />
        </div>
      </>
    );
  }
  if (error) {
    <>
      <Header />
      <div className=" fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Loader />
      </div>
    </>;
  }

  if (data) {
    return (
      <>
        <Header />
        <Options
          selectAll={selectAll}
          handleSelectAll={handleSelectAll}
          HandleDelete={HandleDelete}
          isCheck={isCheck}
          catalog={catalog}
          user="une maison"
          HandleAddData={HandleAddData}
          isTrueToAddData={isTrueToAddData}
        />
      </>
    );
  }
}
