import { useParams } from "react-router-dom";
import Header from "../header";
import data from "../../utils/list-of-houses";
import SinglePreviewTenants from "../single/single-tenant";

export default function TenantPreview() {
  const { id } = useParams();
  const listTenants = data.tenants;
  const tenants = listTenants.find((tenant) => tenant.id === id);
  console.log(listTenants);
  return (
    <>
      <SinglePreviewTenants tenantsParams={tenants} />
    </>
  );
}
