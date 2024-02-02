import Navigation from "../navigation/navigation";

export default function Sidebar() {
  return (
    <>
      <div>
        <div className="flex bg-fuchsia-700 h-20 justify-center items-center text-xl">
          <h1 className="text-white ">Carnet de Loyer</h1>
        </div>
        <div className="p-4">
          <Navigation />
        </div>
      </div>
    </>
  );
}
