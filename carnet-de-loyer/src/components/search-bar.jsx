export default function SearchBar() {
  return (
    <>
      <div className="flex w-[400px] bg-[#E3EBF3] p-2 pr-3 rounded text-lg text-black items-center">
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
