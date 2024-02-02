import Navigation from "../navigation/navigation";

export default function Sidebar() {
  return (
    <>
      <div>
        <div className="flex bg-fuchsia-700 h-20  p-3 items-center text-xl">
          <img
            src="public/images/icone-grafiki.png"
            alt="icone-grafiki"
            className="max-w-12"
            viewBox="0 0 24 24"
          />
          <h1 className="text-white ">Carnet de Loyer</h1>
        </div>
        <div className="p-4">
          <Navigation />
        </div>
      </div>
    </>
  );
}
