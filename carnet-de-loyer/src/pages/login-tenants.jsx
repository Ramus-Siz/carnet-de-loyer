import { useForm } from "react-hook-form";

export default function LoginTenants({ onSubmitTenant }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-[50%] w-[100%] border-solid shadow-white  bg-[#f4f4f4]  rounded  ">
        <h2 className="text-center text-4xl pb-4">Se connecter</h2>
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
                  type="tenantPassword"
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
