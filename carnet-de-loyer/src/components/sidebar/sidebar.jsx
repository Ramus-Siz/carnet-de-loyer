import Avatar from "../avatar";
import Navigation from "../navigation/navigation";

export default function Sidebar() {
  return (
    <>
      <div className="flex  h-20 items-center border border-[#474747]">
        <img src="/images/icone-grafiki.png" alt="" className="w-[70px]" />
        <h1 className="bg-gradient-to-r from-white to-fuchsia-500 bg-clip-text text-transparent font-bold text-lg">
          Carnet de loyer
        </h1>
      </div>

      <div className="">
        <Navigation />
      </div>
      <div className="fixed bottom-0">
        <Avatar />
      </div>
    </>
  );
}
