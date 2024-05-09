export default function Logo() {
  return (
    <>
      <div className="flex flex-row h-20 justify-center items-center bg-[#2b213f] border-b-8 border-[#283342] ">
        <img
          src="/images/icone-grafiki.png"
          alt=""
          className="w-[40px] md:w-[70px] "
        />
        <h1 className="bg-gradient-to-r from-white to-fuchsia-500 bg-clip-text text-transparent font-bold text-lg">
          Carnet de loyer
        </h1>
      </div>
    </>
  );
}
