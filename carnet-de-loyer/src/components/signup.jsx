import { useForm } from "react-hook-form";
export default function Signup({ onRegister }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className=" flex flex-col justify-center h-[50%] w-[100%] border-solid shadow-white rounded ">
        <h2 className="text-center text-4xl pb-4">Créer un compte</h2>
        <h3 className="text-center text-[#a21caf]">
          Ce compte est propre aux Bailleurs
        </h3>
        <div className="flex justify-center items-center ">
          <form
            onSubmit={handleSubmit(onRegister)}
            className="flex flex-col w-[65%] pt-4"
          >
            <div className="flex flex-col ">
              <div className="">
                <label className="text-base">Username</label>
                <input
                  className="border-2border-[#f4f4f4] rounded-lg outline-0 w-[100%] p-2"
                  type="text"
                  name="usernameOnregister"
                  {...register("usernameOnRegister", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.usernameOnregister && (
                  <span style={{ color: "red" }}>
                    {errors.usernameOnregister.message}
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-col ">
              <div className="">
                <label className="text-base">Email</label>
                <input
                  className="border-2 border-[#f4f4f4] rounded-lg outline-0 w-[100%] p-2"
                  type="email"
                  name="emailOnRegister"
                  {...register("emailOnRegister", {
                    required: "ce champ est obligatoir",
                    pattern: {
                      value: /^[^s@]+@[^s@]+.[^s@]+$/,
                      message: "L'email n'est pas valide.",
                    },
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.email && (
                  <span style={{ color: "red" }}>{errors.email.message}</span>
                )}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="">
                <label className="text-base">Password</label>
                <input
                  className="pl-2 border-[#f4f4f4] rounded-lg outline-0 w-[100%] p-2"
                  type="password"
                  name="passwordOnRegister"
                  {...register("passwordOnRegister", {
                    required: "ce champ est obligatoire",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.passwordOnRegister && (
                  <span style={{ color: "red" }}>
                    {errors.passwordOnRegister.message}
                  </span>
                )}
              </p>
            </div>

            <button
              type="submit"
              className="bg-orange-600 w-[100%] text-white rounded-md hover:bg-fuchsia-700 pt-1 pb-1"
            >
              Enregistrer
            </button>
            {/* <button onClick={handlCreateAccount}>Créer un compte?</button> */}
          </form>
        </div>
      </div>
    </>
  );
}
