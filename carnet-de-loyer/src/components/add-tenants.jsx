import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import RegisterButton from "./registre-button";
import { useRentBooklet } from "./contexts/context";

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

  function onSubmit(newTenant) {
    console.log(newTenant);
    const tenantObjetBuild = BuildNewTenantObject(newTenant);
    console.log(tenantObjetBuild);
    updateTenants([...tenants, tenantObjetBuild]);
    reset();
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

    const newTenantsObject = {
      id: `${keyOfTenants}`,
      name: newTenant.name,
      prenom: newTenant.prenom,
      adress: newTenant.adress,
      email: newTenant.email,
      telephone: newTenant.telephone,
      lessorId: tenants.bails.residentId,
    };
    return newTenantsObject;
  }

  const catalog = list.map(({ id, libele }) => {
    return (
      <option value={libele} key={id}>
        {libele}
      </option>
    );
  });

  useEffect(() => {
    setList(houses);
  }, [houses]);
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
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Nom</label>
            <input
              type="text"
              name="name"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3 "
              placeholder="Rafiki"
              {...register("name", { require: "Obligatoire" })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Prénom</label>
            <input
              type="text"
              name="prenom"
              id=""
              className=" p-2 bg-[#F7FAFD] border-none outline-none pl-3 "
              placeholder="Richard"
              {...register("prenom", { require: "Obligatoire" })}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
              {...register("email", { require: "email Obligatoire" })}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Adresse</label>
            <input
              type="text"
              name="adress"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
              {...register("adress", { require: "adresse Obligatoire" })}
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <label>Télephone :</label>
            <input
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
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
          <div className="flex flex-col gap-2">
            <label>Début du contrat</label>
            <input
              type="date"
              name="start"
              id=""
              className="p-2 bg-[#F7FAFD] border-none outline-none pl-3"
              {...register("start", { require: "Obligatoire" })}
            />
          </div>
        </div>

        <RegisterButton />
      </form>
    </>
  );
}
