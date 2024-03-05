import Avatar from "../avatar";
import Logo from "../logo";
import Navigation from "../navigation/navigation";

export default function Sidebar() {
  return (
    <>
      <Logo />

      <div className="">
        <Navigation />
      </div>
      <Avatar />
    </>
  );
}
