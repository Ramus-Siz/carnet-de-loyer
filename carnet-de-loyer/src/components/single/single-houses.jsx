import { useParams } from "react-router-dom";
import Header from "../header";
import { useRentBooklet } from "../contexts/context";

export default function SinglePreviewHouses() {
  const { id } = useParams();
  const listHouses = useRentBooklet((state) => state.houses);

  const houses = listHouses.find((house) => house.id === id);
  console.log(houses);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-8 p-8">
        <div className="flex gap-4 items-center">
          <span className="text-orange-600 text-xl">
            <ion-icon name="home-outline"></ion-icon>
          </span>
          <h2 className="   font-semibold">Maison sur {houses.libele}</h2>
        </div>

        <table className="w-fuul text-center border-collapse border border-slate-400 ... ">
          <thead>
            <tr>
              <th scope="col" className=" p-8 border border-slate-300 ...">
                Type
              </th>
              <th scope="col" className=" p-8  border border-slate-300 ...">
                Adress
              </th>
              <th scope="col" className="p-8  border border-slate-300 ...">
                Composition
              </th>
              <th scope="col" className="p-8 border border-slate-300 ...">
                Disponible
              </th>
              <th scope="col" className="p-8 border border-slate-300 ...">
                Locataire
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="">
              <td className=" p-8 border border-slate-300 ...">
                {houses.type}
              </td>
              <td className="p-8 border border-slate-300 ...">
                {houses.adress}
              </td>
              <td className="p-8 border border-slate-300 ...">
                {houses.composition}
              </td>
              <td className="p-8 border border-slate-300 ...">Oui</td>
              <td className="p-8 border border-slate-300 ...">Non</td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
        <div className="flex flex-col gap-4 w-[90%]">
          <h2 className="font-semibold">Description:</h2>
          <p>{houses.description}</p>
        </div>
      </div>
    </>
  );
}
