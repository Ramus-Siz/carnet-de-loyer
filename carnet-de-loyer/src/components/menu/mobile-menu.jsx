import Navigation from "../navigation/navigation";

export default function MobileMenu({ setMobileMenu, mobileMenu }) {
  return (
    <>
      <div
        className="text-white text-2xl absolute top-10 right-10"
        onClick={() => setMobileMenu(!mobileMenu)}
      >
        <ion-icon name="close-outline"></ion-icon>
      </div>
      <div>
        <Navigation />
      </div>
    </>
  );
}
