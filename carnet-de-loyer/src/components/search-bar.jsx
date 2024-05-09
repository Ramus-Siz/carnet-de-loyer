export default function SearchBar() {
  return (
    <>
      <div className="md:flex md:w-[400px] md:bg-[#E3EBF3] md:p-2 md:pr-3 md:rounded md:text-lg md:text-black md:items-center hidden">
        <input
          type="search"
          name=""
          id=""
          placeholder="Recherche Rapide ..."
          className="w-[400px] bg-[#E3EBF3]  border-none outline-none pl-3"
        />
        <ion-icon name="search-outline"></ion-icon>
      </div>
    </>
  );
}
