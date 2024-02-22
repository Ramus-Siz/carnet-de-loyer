import { useParams } from "react-router-dom";
import SinglePreviewHouses from "../single/single-houses";
import { useRentBooklet } from "../contexts/context";

export default function HousesPreview() {
  const { id } = useParams();
  const listHouses = useRentBooklet((state) => state.houses);

  const houses = listHouses.find((house) => house.id === id);
  console.log(houses);
  return (
    <>
      <SinglePreviewHouses housesParams={houses} />
    </>
  );
}
