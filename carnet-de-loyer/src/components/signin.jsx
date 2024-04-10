import { useForm } from "react-hook-form";
export default function Signin({ onSubmit, loginTenants }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[50%] w-[100%] border-solid shadow-white  bg-[#f4f4f4]  rounded-xl  ">
        <h2 className="text-center text-4xl pb-4">Se connecter</h2>
        <div className="flex flex-col gap-4 justify-center items-center w-[100%]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-[65%] pt-4"
          >
            <div className="flex flex-col ">
              <div className="">
                <label className="text-base">Username</label>
                <input
                  className="border-2 border-[#f4f4f4] rounded-lg outline-0 w-[100%] p-2"
                  type="text"
                  name="username"
                  {...register("username", {
                    required: "ce champ est obligatoire",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.username && (
                  <span style={{ color: "red" }}>
                    {errors.username.message}
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-col">
              <div className="">
                <label className="text-base">Passeword</label>
                <input
                  className="p-2 border-2 border-[#f4f4f4] rounded-lg outline-0 w-[100%]"
                  type="password"
                  name="passeword"
                  {...register("passeword", {
                    required: "ce champ est obligatoire",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.passeword && (
                  <span style={{ color: "red" }}>
                    {errors.passeword.message}
                  </span>
                )}
              </p>
            </div>

            <button
              type="submit"
              className="bg-orange-600 w-[100%] text-white text-lg rounded-md hover:bg-fuchsia-700 p-1"
            >
              Connexion
            </button>
            {/* <button onClick={handlCreateAccount}>Créer un compte?</button> */}
          </form>
          <button className="text-xs pt-1">Mot de passe oublié?</button>

          <button
            className="w-[65%] border-2 border-fuchsia-700   rounded-md p-1 text-xs font-semibold text-fuchsia-700 p-1"
            onClick={loginTenants}
          >
            je suis un locataire
          </button>
        </div>
      </div>
    </>
  );
}
