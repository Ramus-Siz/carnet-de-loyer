import Header from "../components/header";
import { useEffect, useState } from "react";
import CheckBox from "../components/checkbox";
import Options from "../components/options";
import { Link } from "react-router-dom";
import { useRentBooklet } from "../components/contexts/context";
export default function MyTenants() {
  let tenants = useRentBooklet((state) => state.tenants);
  const updateTenants = useRentBooklet((state) => state.updateTenants);
  const fetchDataFromAPI = useRentBooklet((state) => state.fetchDataFromAPI);

  const [isTrueToAddData, setIsTrueToAddData] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState({
    choises: [],
  });
  const [list, setList] = useState([]);

  const HandleAddData = () => {
    setIsTrueToAddData(!isTrueToAddData);
  };
  const HandleDelete = () => {
    let tenantsAfterDelete = [...tenants];
    if (selectAll) {
      tenants = [];
      setSelectAll(false);
      tenantsAfterDelete = [];
      updateTenants(tenantsAfterDelete);
      isCheck.choises = [];
    } else {
      for (let index = 0; index < isCheck.choises.length; index++) {
        tenantsAfterDelete = tenantsAfterDelete.filter(
          (tenant) => tenant.id !== isCheck.choises[index]
        );
      }
      console.log(tenantsAfterDelete);
      updateTenants(tenantsAfterDelete);
      isCheck.choises = [];
    }
  };

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

  const catalog = list.map(({ id, name, prenom }) => {
    return (
      <div key={id}>
        <div className="flex gap-4 p-3 justify-between shadow-xl text-[#b3b5b7]  w-full hover:scale-95 ">
          <div className="flex gap-4">
            <CheckBox
              name={name}
              key={id}
              type="checkbox"
              id={id}
              isChecked={isCheck.choises.includes(id)}
              handleClick={handleClick}
            />
            {`${name} ${prenom}`}
          </div>
          <Link to={`/my-tenants/${id}`}>
            <span className="justify-self-end pr-2 text-fuchsia-700">
              <ion-icon name="eye-outline"></ion-icon>
            </span>
          </Link>
        </div>
      </div>
    );
  });

  useEffect(() => {
    fetchDataFromAPI();
    setList(tenants);
  }, [tenants]);

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
        HandleAddData={HandleAddData}
        isTrueToAddData={isTrueToAddData}
      />
    </>
  );
}
