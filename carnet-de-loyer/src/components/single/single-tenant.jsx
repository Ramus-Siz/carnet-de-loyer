import { useParams } from "react-router-dom";
import { useRentBooklet } from "../contexts/context";
import Header from "../header";

export default function SinglePreviewTenants() {
  const listTenants = useRentBooklet((state) => state.tenants);
  const { id } = useParams();
  const tenants = listTenants.find((tenant) => tenant.id === id);
  console.log(listTenants);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex justify-between items-center gap-8 p-5 bg-[#F7FAFD] rounded-xl">
          <div className="flex gap-4 items-center ">
            <p>{tenants.name} est en ordre</p>
            <ion-icon name="checkmark-outline"></ion-icon>
          </div>
          <div className="flex gap-8">
            <button className="  flex items-center rounded-3xl ">
              <span className="text-orange-600 text-2xl">
                <ion-icon name="create-outline"></ion-icon>
              </span>
              <span>Modifier le Contrat</span>
            </button>
            <button className=" flex items-center  rounded-3xl ">
              <span className="text-orange-600 text-2xl animate-bounce">
                <ion-icon name="download-outline"></ion-icon>
              </span>
              Telecharger le Contrat
            </button>
          </div>
        </div>
        <div className=" flex justify-between gap-8 ">
          <div className=" flex flex-col gap-10 w-[50%] h-[400px] bg-[#283342]  rounded-3xl p-8 ">
            <div className="flex justify-between items-center p-2 rounded-xl border-solid border text-[#acaeb0] border-[#6e6f70]">
              <div className="flex gap-4">
                <h2 className="text-xl">{tenants.name}</h2>
                <h2 className="text-xl">{tenants.prenom}</h2>
              </div>
              <span className="text-xl hover:text-white">
                <ion-icon name="create-outline"></ion-icon>
              </span>
            </div>
            <table className=" border-collapse border border-[#b3b5b7] rounded-3xl text-[#b3b5b7]">
              <tr>
                <td scope="col" className=" p-4 border border-[#3d3e3f] ...">
                  Genre :
                </td>
                <td scope="col" className=" p-4 border border-[#3d3e3f] ...">
                  {tenants.genre}
                </td>
              </tr>

              <tr className="">
                <td className=" p-4 border border-[#3d3e3f] ...">
                  Naissance :
                </td>
                <td className="p-4 border border-[#3d3e3f] ...">
                  {tenants.birthday}
                </td>
              </tr>
              <tr className="">
                <td className=" p-4 border border-[#3d3e3f] ...">ID :</td>
                <td className="p-4 border border-[#3d3e3f] ...">
                  {tenants.id}
                </td>
              </tr>
              <tr className="">
                <td className=" p-4 border border-[#3d3e3f] ...">Tél :</td>
                <td className="p-4 border border-[#3d3e3f] ...">
                  {tenants.phoneNumber}
                </td>
              </tr>
            </table>
          </div>

          <div className="flex gap-10 flex-col  w-[50%] h-[400px] text-[#d6d8da]  bg-fuchsia-700  rounded-3xl p-8">
            <div className="flex justify-between items-center p-2 rounded-xl border-solid border border-[#afb0b1]">
              <h2 className="text-xl">Contrat</h2>
              <span className="text-xl hover:text-white">
                <ion-icon name="create-outline"></ion-icon>
              </span>
            </div>
            <table className=" border-collapse border border-[#b3b5b7] rounded-3xl">
              <tr>
                <td scope="col" className=" p-4 border border-[#b3b5b7] ...">
                  Maison :
                </td>
                <td scope="col" className=" p-4 border border-[#b3b5b7] ...">
                  {tenants.maison}
                </td>
              </tr>

              <tr className="">
                <td className=" p-4 border border-[#b3b5b7] ...">Début :</td>
                <td className="p-4 border border-[#b3b5b7] ...">
                  {tenants.contrat.start}
                </td>
              </tr>
              <tr className="">
                <td className=" p-4 border border-[#b3b5b7] ...">Garantie :</td>
                <td className="p-4 border border-[#b3b5b7] ...">
                  {tenants.contrat.guarantee}
                </td>
              </tr>
              <tr className="">
                <td className=" p-4 border border-[#b3b5b7] ...">
                  Prix loyer/mois :
                </td>
                <td className="p-4 border border-[#b3b5b7] ...">
                  {tenants.contrat.rentPrice}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
