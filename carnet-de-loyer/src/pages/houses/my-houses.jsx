import { useEffect, useState } from "react";
import CheckBox from "../../components/checkbox";
import Header from "../../components/header";
import Options from "../../components/options";
import { Link } from "react-router-dom";
import { useRentBooklet } from "../../components/contexts/context";
import axios from "axios";
import Loader from "../../components/loader";
import { BASE_API_URL } from "../../utils/config";
import Avatar from "../../components/avatar";
import HouseModaleWhenDelete from "../../components/houseModaleWhenDelete";

export default function MyHouses() {
  const [isHouseMOdalWhenDeletedOpen, setIsHouseMOdalWhenDeletedOpen] =
    useState(false);
  const [houseAdress, setHouseAdress] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let houses = useRentBooklet((state) => state.houses);
  const updateHouses = useRentBooklet((state) => state.updateHouses);
  const updateCurrentUser = useRentBooklet((state) => state.updateCurrentUser);
  let currentUser = useRentBooklet((state) => state.currentUser);
  const getUserConnected = sessionStorage.getItem("currentUser");
  const userConnected = JSON.parse(getUserConnected);
  const userUrl = `${BASE_API_URL}/my-houses/lessor/${userConnected.lessorId}`;

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
      // Traitez chaque maison sélectionnée
      for (const house of housesAfterDelete) {
        // Vérifiez si la maison contient des baux
        if (house.bails.length > 0) {
          // Affichez un message à l'utilisateur indiquant que la maison contient des baux
          console.log(
            `La maison ${house.adress} contient est sous contrat et ne peut pas être supprimée.`
          );
          setHouseAdress(house.adress);
          setIsHouseMOdalWhenDeletedOpen(true);
        } else {
          // Si la maison ne contient aucun bail, procédez à sa suppression
          await deleteHouse(house.id);
        }
      }

      // Mettez à jour la liste des maisons après la suppression
      updateHouses(housesAfterDelete);
      // Réinitialisez les états
      setIsCheck({ choises: [] });
      setSelectAll(false);
      sessionStorage.removeItem("myHouses");
      sessionStorage.setItem("myHouses", JSON.stringify(housesAfterDelete));
    } else {
      // Si seulement certaines maisons sont sélectionnées, traitez-les
      for (const choiceId of isCheck.choises) {
        const house = housesAfterDelete.find((house) => house.id === choiceId);
        if (house && house.bails.length > 0) {
          console.log(
            `La maison ${house.adress} contient des baux et ne peut pas être supprimée. `
          );
          setHouseAdress(house.adress);
          setIsHouseMOdalWhenDeletedOpen(true);
        } else {
          await deleteHouse(choiceId);
          housesAfterDelete = housesAfterDelete.filter(
            (house) => house.id !== choiceId
          );
        }
      }

      // Mettez à jour la liste des maisons après la suppression
      updateHouses(housesAfterDelete);
      // Réinitialisez l'état des cases à cocher
      setIsCheck({ choises: [] });
      sessionStorage.setItem("myHouses", JSON.stringify(housesAfterDelete));
    }
  };

  const deleteHouse = async (houseId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`${BASE_API_URL}/my-houses/delete/${houseId}`, {
        headers: {
          authorization: token,
        },
      });
      console.log(
        `La maison avec l'ID ${houseId} a été supprimée avec succès.`
      );
    } catch (error) {
      console.error("Erreur lors de la suppression de la maison:", error);
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
  const handleClose = () => {
    setIsHouseMOdalWhenDeletedOpen(false);
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
  }, [userConnected.lessorId]);

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
      {data && (
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
      )}
      {isHouseMOdalWhenDeletedOpen && (
        <HouseModaleWhenDelete
          handleClose={handleClose}
          houseAdress={houseAdress}
        />
      )}
    </>
  );
}
