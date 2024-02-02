import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    passeword: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: formData });

  const onSubmit = (data) => {
    {
      data.username == "admin" && data.passeword == "admin"
        ? navigate("/home")
        : navigate("/");
    }
  };

  function handlCreateAccount() {
    navigate("/new-account");
  }

  return (
    <div className="flex justify-center text-black  items-center h-screen">
      <div className="w-96 border-solid shadow-white rounded-2xl bg-slate-200 p-8">
        <h1 className="text-4xl  font-bold pb-5 text-center">Login</h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-1"
          >
            <div className="flex flex-col ">
              <div className="flex justify-between">
                <label>UserName</label>
                <input
                  className="border-b-2 border-slate-600 bg-slate-200 outline-0"
                  type="text"
                  name="username"
                  {...register("username", {
                    required: "ce champ est obligatoir",
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
              <div className="flex justify-between">
                <label>Passeword</label>
                <input
                  className="border-b-2 border-slate-600 bg-slate-200 outline-0"
                  type="password"
                  name="passeword"
                  {...register("passeword", {
                    required: "ce champ est obligatoir",
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
              className="bg-orange-600 p-2 text-white rounded-md hover:bg-fuchsia-700"
            >
              Se connecter
            </button>
            <button onClick={handlCreateAccount}>Créer un compte?</button>
          </form>
        </div>
      </div>
    </div>
  );
}
