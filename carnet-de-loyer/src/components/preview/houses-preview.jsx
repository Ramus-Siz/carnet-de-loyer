import { useParams } from "react-router-dom";
import Header from "../header";
import allHouses from "../../utils/list-of-houses";
import SinglePreviewHouses from "../single/single-houses";

export default function HousesPreview() {
  const { id } = useParams();
  const listHouses = allHouses.houses;
  const houses = listHouses.find((house) => house.id === id);
  console.log(houses);
  return (
    <>
      <SinglePreviewHouses housesParams={houses} />
    </>
  );
}
