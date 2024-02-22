import Header from "../components/header";
import { useEffect, useState } from "react";
import CheckBox from "../components/checkbox";
import allHouses from "../utils/list-of-houses";
import Options from "../components/options";
import { Link } from "react-router-dom";
import { useRentBooklet } from "../components/contexts/context";
export default function MyTenants() {
  const tenants = useRentBooklet((state) => state.tenants);

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState({
    choises: [],
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(tenants);
  }, [list]);

  const HandleDelete = (housesToDelete) => {};
  const handleSelectAll = (e) => {
    setSelectAll(!selectAll);
    setIsCheck({ choises: list.map((li) => li.id) });
    if (selectAll) {
      setIsCheck({ choises: [] });
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    const { choises: reponses } = isCheck;
    console.log(id, "is", checked);
    if (checked) {
      setIsCheck({ choises: [...reponses, id] });
    } else {
      setIsCheck({ choises: reponses.filter((item) => item !== id) });
    }
  };

  console.log(isCheck.choises);

  const catalog = list.map(({ id, nom, prenom }) => {
    return (
      <div key={id}>
        <div className="flex gap-4 p-3 justify-between bg-[#F7FAFD] border-white border-solid border-2 w-full hover:scale-95 hover:bg-orange-200">
          <div className="flex gap-4">
            <CheckBox
              name={nom}
              key={id}
              type="checkbox"
              id={id}
              isChecked={isCheck.choises.includes(id)}
              handleClick={handleClick}
            />
            {`${nom} ${prenom}`}
          </div>
          <Link to={`/my-tenants/${id}`}>
            <span className="justify-self-end pr-2">
              <ion-icon name="eye-outline"></ion-icon>
            </span>
          </Link>
        </div>
      </div>
    );
  });

  return (
    <>
      <Header />
      <Options
        selectAll={selectAll}
        handleSelectAll={handleSelectAll}
        HandleDelete={HandleDelete}
        isCheck={isCheck}
        catalog={catalog}
        user="un / une locataire"
      />
    </>
  );
}
