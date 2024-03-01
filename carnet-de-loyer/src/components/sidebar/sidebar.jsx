import Avatar from "../avatar";
import Navigation from "../navigation/navigation";

export default function Sidebar() {
  return (
    <>
      <div className="flex bg-fuchsia-700 h-20   items-center text-xl">
        <img
          src="/images/icone-grafiki.png"
          alt="icone-grafiki"
          className="max-w-12"
          viewBox="0 0 24 24"
        />
        <h1 className="text-white ">Carnet de Loyer</h1>
      </div>

      <div className="">
        <Navigation />
      </div>
      <div className="fixed bottom-4 ">
        <Avatar />
      </div>
    </>
  );
}
