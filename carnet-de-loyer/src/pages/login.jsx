import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Signin from "../components/signin";
import Signup from "../components/signup";
import MoreInfosOfLandLord from "./more-infos-landlord";
import LoginTenants from "./login-tenants";

export default function Login({}) {
  const [isTenant, setIsTenant] = useState(false);
  const [isNeedToCreate, setIsNeedToCreate] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate("/home");
  };
  const onSubmitTenant = (data) => {
    navigate("/my-rent-book");
  };
  const onRegister = (data) => {
    {
      setIsRegister(true);
    }
  };

  const onRegisterMoreInfos = (data) => {
    {
      navigate("/home");
    }
  };

  function loginTenants() {
    setIsTenant(true);
  }

  return (
    <div className=" flex text-black w-screen  items-center">
      <div className=" flex justify-end items-center h-screen w-[50%]   bg-[url('./assets/19198828.jpg')] bg-contain bg-center bg-no-repeat"></div>
      <div className=" flex h-screen w-[50%] justify-center items-center bg-[#f4f4f4]  ">
        <div className="flex flex-col justify-center items-center  w-[100%] p-2 gap-6 ">
          {!isRegister ? (
            <>
              {!isNeedToCreate ? (
                <>
                  {!isTenant ? (
                    <Signin onSubmit={onSubmit} loginTenants={loginTenants} />
                  ) : (
                    <LoginTenants onSubmitTenant={onSubmitTenant} />
                  )}
                </>
              ) : (
                <Signup onRegister={onRegister} />
              )}

              <button
                onClick={() => setIsNeedToCreate(true)}
                className="text-xs pt-1"
              >
                Vous n'avez pas de compte?
                <span className="text-orange-600 font-semibold">Créer</span>
              </button>
            </>
          ) : (
            <MoreInfosOfLandLord onRegisterMoreInfos={onRegisterMoreInfos} />
          )}
        </div>
      </div>
    </div>
  );
}
