import { useEffect, useState } from "react";
import CheckBox from "../../components/checkbox";
import Header from "../../components/header";
import Options from "../../components/options";
import { Link } from "react-router-dom";
import { useRentBooklet } from "../../components/contexts/context";

export default function MyHouses() {
  let houses = useRentBooklet((state) => state.houses);
  const updateHouses = useRentBooklet((state) => state.updateHouses);

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

  const HandleDelete = () => {
    // Créez une copie de `houses` pour éviter de modifier directement l'état original
    let housesAfterDelete = [...houses];

    if (selectAll) {
      // Réinitialiser les maisons et les choix
      setIsCheck({ choises: [] });
      setSelectAll(false);
      housesAfterDelete = [];
      updateHouses([]);
    } else {
      // Filtrer `housesAfterDelete` pour supprimer les maisons sélectionnées
      isCheck.choises.forEach((choiceId) => {
        housesAfterDelete = housesAfterDelete.filter(
          (house) => house.id !== choiceId
        );
      });
      updateHouses(housesAfterDelete);
      setIsCheck({ choises: [] });
    }
  };

  const handleSelectAll = (e) => {
    setSelectAll(!selectAll);
    setIsCheck({ choises: list.map((li) => li.id) });
    if (selectAll) {
      setIsCheck({ choises: [] });
    }
  };

  // const handleClick = (e) => {
  //   const { id, checked } = e.target;
  //   const { choises: reponses } = isCheck;
  //   console.log(id, "is", checked);

  //   if (checked) {
  //     setIsCheck({ choises: [...reponses, id] });
  //   } else {
  //     setIsCheck({ choises: reponses.filter((item) => item !== id) });
  //   }
  // };

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

  const catalog = list.map(({ id, adress }) => {
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
  //re set the list of house
  useEffect(() => {
    setList(houses);
  }, [houses]);

  return (
    <>
      <div className="">
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
      </div>
    </>
  );
}
