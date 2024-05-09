import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginTenants({ onSubmitTenant, setIsTenant }) {
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[50%] w-[100%] border-solid shadow-white  bg-[#f4f4f4]  rounded  ">
        <h2 className="text-center text-4xl">Se connecter</h2>
        <h3 className="pb-2 text-fuchsia-700">En tant que Locataire </h3>
        <div
          className="pb-4 text-orange-600 text-xs cursor-pointer flex justify-center items-center gap-2"
          onClick={() => setIsTenant(false)}
        >
          <span>Ou se connecter en tant que bailleur</span>
          <span className="">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </span>
        </div>

        <div className=" flex justify-center items-center w-[100%]">
          <form
            onSubmit={handleSubmit(onSubmitTenant)}
            className="flex flex-col pt-4 w-[65%]"
          >
            <div className="flex flex-col ">
              <div className="">
                <label className="text-base">Email</label>
                <input
                  className="border-2 border-[#f4f4f4] rounded-lg outline-0 w-[100%] p-2"
                  type="tenantEmail"
                  name="tenantEmail"
                  {...register("tenantEmail", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.tenantEmail && (
                  <span style={{ color: "red" }}>
                    {errors.tenantEmail.message}
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="">
                <label className="text-base">Passeword</label>
                <input
                  className="border-2 border-[#f4f4f4] rounded-lg outline-0 w-[100%] p-2"
                  type="password"
                  name="tenantPassword"
                  {...register("tenantPassword", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.tenantPassword && (
                  <span style={{ color: "red" }}>
                    {errors.tenantPassword.message}
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-col ">
              <div className="">
                <label className="text-base">Code du Bailleur</label>
                <input
                  className="border-2 border-[#f4f4f4] rounded-lg outline-0 w-[100%] p-2"
                  type="text"
                  name="codeLandlord"
                  {...register("codeLandlord", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.codeLandlord && (
                  <span style={{ color: "red" }}>
                    {errors.codeLandlord.message}
                  </span>
                )}
              </p>
            </div>

            <button
              type="submit"
              className="bg-orange-600 w-[100%] text-white rounded-md hover:bg-fuchsia-700 p-1"
            >
              Se connecter
            </button>
            <button className="text-xs pt-1">Mot de passe oublié?</button>
          </form>
        </div>
      </div>
    </>
  );
}
