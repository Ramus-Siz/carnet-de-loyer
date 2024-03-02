import Avatar from "../avatar";
import Logo from "../logo";
import Navigation from "../navigation/navigation";
import TenantsNavigation from "./tenantsNavigation";

export default function TenantsSidebar() {
  return (
    <>
      <Logo />

      <div className="">
        <TenantsNavigation />
      </div>
      <div className="fixed bottom-0">
        <Avatar />
      </div>
    </>
  );
}
