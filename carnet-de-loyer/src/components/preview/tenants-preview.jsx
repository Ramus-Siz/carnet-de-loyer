import { useParams } from "react-router-dom";
import Header from "../header";
import data from "../../utils/list-of-houses";
import SinglePreviewTenants from "../single/single-tenant";
import { useRentBooklet } from "../contexts/context";

export default function TenantPreview() {
  const listTenants = useRentBooklet((state) => state.houses);
  const { id } = useParams();
  const tenants = listTenants.find((tenant) => tenant.id === id);
  console.log(listTenants);
  return <></>;
}
