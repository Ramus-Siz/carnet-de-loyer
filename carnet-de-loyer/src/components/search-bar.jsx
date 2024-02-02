export default function SearchBar() {
  return (
    <>
      <div className="flex w-[400px] bg-[#E3EBF3] p-2 rounded text-xs text-black">
        <input
          type="search"
          name=""
          id=""
          placeholder="Recherche Rapide ..."
          className="w-[400px] bg-[#E3EBF3]  border-none outline-none pl-3"
        />
        <img src="/images/icon/Search.png" alt="icon-search" />
      </div>
    </>
  );
}
