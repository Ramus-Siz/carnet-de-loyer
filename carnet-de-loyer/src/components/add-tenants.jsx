import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RegisterButton from "./registre-button";
import { useRentBooklet } from "./contexts/context";
import axios from "axios";

export default function AddTenants({ HandleAddTenants }) {
  const tenants = useRentBooklet((state) => state.tenants);
  const houses = useRentBooklet((state) => state.houses);

  const updateTenants = useRentBooklet((state) => state.updateTenants);
  const [formData, setFormData] = useState({
    libele: "",
    adress: "",
    type: "",
    composition: "",
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData });
  const [list, setList] = useState([]);

  async function onSubmit(newTenant) {
    console.log(newTenant);
    const tenantObjetBuild = BuildNewTenantObject(newTenant);
    handleClickButtonEnregister(tenantObjetBuild);
    console.log(tenantObjetBuild);
  }

  async function handleClickButtonEnregister(tenantObjetBuild) {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/my-tenants/add",
        tenantObjetBuild,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        updateTenants([...tenants, tenantObjetBuild]);
        reset();
      } else {
        console.log("Error lors de l'ajout, veillez recommencer ");
      }

      console.log(response.data);
    } catch (error) {
      console.log("error serveur", error);
    }
  }

  function BuildNewTenantObject(newTenant) {
    let keyOftheLasTenant = [];
    let keyOfTenants;
    // console.log(keyOftheLasTenant.length);
    if (tenants.length == 0) {
      keyOfTenants = 1;
      console.log(keyOfTenants);
    } else {
      for (const tenant of tenants) {
        keyOftheLasTenant.push(parseInt(tenant.id));
      }
      // console.log(keyOftheLasTenant);
      keyOfTenants = Math.max(...keyOftheLasTenant) + 1;
    }
    const getcurrentUser = sessionStorage.getItem("currentUser");
    const user = JSON.parse(getcurrentUser);
    console.log(user.lessorId);

    const newTenantsObject = {
      id: +`${keyOfTenants}`,
      name: newTenant.name,
      prenom: newTenant.prenom,
      adress: newTenant.adress,
      email: newTenant.email,
      telephone: newTenant.telephone,
      lessorId: user.lessorId,
    };
    return newTenantsObject;
  }

  return (
    <>
      <div className="flex items-center h-20 bg-[#283342]  border-b-8 border-[#F7FAFD] p-4">
        <p className="bg-[#283342] text-white pl-4 ">
          <button onClick={HandleAddTenants} className="text-orange-600">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </p>
      </div>

      <form
        className=" flex flex-col gap-5 p-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" ">
          <div className="flex flex-col gap-2">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3 rounded-2xl "
              placeholder="Rafiki"
              {...register("name", { require: "Obligatoire" })}
            />
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom"
              id=""
              className=" p-2 bg-[#F7FAFD] border-none outline-none pl-3 rounded-2xl"
              placeholder="Richard"
              {...register("prenom", { require: "Obligatoire" })}
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id=""
              placeholder="ramus@gmail.com"
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3 rounded-2xl"
              {...register("email", { require: "email Obligatoire" })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Adresse</label>
            <input
              type="text"
              name="adress"
              id=""
              placeholder="32, Av, Quartier, Commune"
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3 rounded-2xl"
              {...register("adress", { require: "adresse Obligatoire" })}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Télephone :</label>
            <input
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3 rounded-2xl"
              type="text"
              name="telephone"
              placeholder="09700452686"
              {...register("telephone", {
                required: "ce champ est obligatoir",
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: "Ce champ n'a pas un bon format",
                },
              })}
            />
          </div>
        </div>

        <RegisterButton />
      </form>
    </>
  );
}
