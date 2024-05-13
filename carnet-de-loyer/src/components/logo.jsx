import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigation = useNavigate();
  return (
    <>
      <div
        className="flex flex-row md:h-20 justify-center items-center bg-[#2b213f] md:border-b-8 md:border-[#283342] cursor-pointer"
        onClick={() => navigation("/home")}
      >
        <img
          src="/images/icone-grafiki.png"
          alt=""
          className="w-[50px] md:w-[70px] "
        />
        <h1 className="bg-gradient-to-r from-white to-fuchsia-500 bg-clip-text text-transparent font-bold text-lg">
          Carnet de loyer
        </h1>
      </div>
    </>
  );
}
