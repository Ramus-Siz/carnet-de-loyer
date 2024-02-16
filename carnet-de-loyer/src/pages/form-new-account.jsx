import { useState } from "react";
import { useForm } from "react-hook-form";

export default function NewAccount() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: 18,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  const onSubmit = (data) => {
    console.log(data);
    alert(`${data.name} a été enregistré`);
  };

  return (
    <div className="flex justify-center text-black  items-center h-screen">
      <div className="w-96 border-solid shadow-white rounded-l-2xl bg-slate-200 p-8">
        <h1 className="text-4xl  font-bold pb-5 text-center">
          Créer un compte
        </h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label>Nom</label>
                <input
                  className="border-b-2 border-slate-600 bg-slate-200 outline-0"
                  type="text"
                  name="name"
                  {...register("name", { required: "ce champ est obligatoir" })}
                />
              </div>
              <p className="self-end h-4 text-xs">
                {errors.name && (
                  <span style={{ color: "red" }}>{errors.name.message}</span>
                )}
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex justify-between">
                <label>Telephone</label>
                <input
                  className="border-b-2 border-slate-600 bg-slate-200 outline-0"
                  type="text"
                  name="phone"
                  {...register("phone", {
                    required: "ce champ est obligatoir",
                    pattern: {
                      value: /^[0-9]{10}$/i,
                      message: "Ce champ n'a pas un bon format",
                    },
                  })}
                />
              </div>
              <p className="self-end text-xs h-4">
                {errors.phone && (
                  <span style={{ color: "red" }}>{errors.phone.message}</span>
                )}
              </p>
            </div>
            <div>
              <div className="flex justify-between">
                <label>Email</label>
                <input
                  className="border-b-2 border-slate-600 bg-slate-200 outline-0"
                  type="email"
                  name="email"
                  {...register("email")}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <label>Age</label>
              <input
                className="border-b-2 border-slate-600 bg-slate-200 outline-0"
                type="Number"
                name="age"
                {...register("age")}
              />
            </div>
            <div className="flex justify-between">
              <label>Genre</label>
              <select
                name="gender"
                {...register("gender")}
                className="border-b-2 border-slate-600 bg-slate-200 outline-0 w-[57%]"
              >
                <option value="femme">Femme</option>
                <option value="Homme">Homme</option>
                <option value="Autre">Autre</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-orange-600 p-2 text-white rounded-md hover:bg-fuchsia-700"
            >
              Enregistrer
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col items-center w-96 bg-fuchsia-700 border-solid shadow-white rounded-r-2xl  p-8 h-[423px]">
        <img
          src="/images/icone-grafiki.png"
          alt="icone-grafiki"
          className="max-w-72"
          viewBox="0 0 24 24"
        />
        <button className="text-white">En savoir plus</button>
      </div>
    </div>
  );
}
