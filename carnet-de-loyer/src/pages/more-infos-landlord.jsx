import { useForm } from "react-hook-form";

export default function MoreInfosOfLandLord({ onRegisterMoreInfos }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div className="h-[25em] w-[100%] border-solid shadow-white rounded bg-[#fff] p-8">
        <h2 className="text-center text-2xl">
          Completer quelques informations{" "}
        </h2>
        <div className="flex justify-center items-center ">
          <form
            onSubmit={handleSubmit(onRegisterMoreInfos)}
            className="flex flex-col w-[200px] pt-4"
          >
            <div className="flex flex-col ">
              <div className="">
                <label className="text-xs">Nom</label>
                <input
                  className="border-2 border-[#7f7f7f] rounded-lg outline-0 w-[100%] pl-2"
                  type="text"
                  name="nom"
                  {...register("usernameOnRegister", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.nom && (
                  <span style={{ color: "red" }}>{errors.nom.message}</span>
                )}
              </p>
            </div>
            <div className="flex flex-col ">
              <div className="">
                <label className="text-xs">Prenom</label>
                <input
                  className="border-2 border-[#7f7f7f] rounded-lg outline-0 w-[100%] pl-2"
                  type="text"
                  name="prenom"
                  {...register("prenom", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.prenom && (
                  <span style={{ color: "red" }}>{errors.prenom.message}</span>
                )}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="">
                <label className="text-xs">Adresse</label>
                <input
                  className="pl-2 border-2 border-[#7f7f7f] rounded-lg outline-0 w-[100%]"
                  type="text"
                  name="adresse"
                  {...register("adresse", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.adresse && (
                  <span style={{ color: "red" }}>{errors.adresse.message}</span>
                )}
              </p>
            </div>

            <button
              type="submit"
              className="bg-orange-600 w-[100%] text-white rounded-md hover:bg-fuchsia-700"
            >
              Enregistrer
            </button>
            {/* <button onClick={handlCreateAccount}>Créer un compte?</button> */}
          </form>

          <form
            onSubmit={handleSubmit(onRegisterMoreInfos)}
            className="flex flex-col w-[200px] pt-4"
          >
            <div className="flex flex-col ">
              <div className="">
                <label className="text-xs">Nom</label>
                <input
                  className="border-2 border-[#7f7f7f] rounded-lg outline-0 w-[100%] pl-2"
                  type="text"
                  name="nom"
                  {...register("usernameOnRegister", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.nom && (
                  <span style={{ color: "red" }}>{errors.nom.message}</span>
                )}
              </p>
            </div>
            <div className="flex flex-col ">
              <div className="">
                <label className="text-xs">Prenom</label>
                <input
                  className="border-2 border-[#7f7f7f] rounded-lg outline-0 w-[100%] pl-2"
                  type="text"
                  name="prenom"
                  {...register("prenom", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.prenom && (
                  <span style={{ color: "red" }}>{errors.prenom.message}</span>
                )}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="">
                <label className="text-xs">Adresse</label>
                <input
                  className="pl-2 border-2 border-[#7f7f7f] rounded-lg outline-0 w-[100%]"
                  type="text"
                  name="adresse"
                  {...register("adresse", {
                    required: "ce champ est obligatoir",
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.adresse && (
                  <span style={{ color: "red" }}>{errors.adresse.message}</span>
                )}
              </p>
            </div>

            <button
              type="submit"
              className="bg-orange-600 w-[100%] text-white rounded-md hover:bg-fuchsia-700"
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
