import DateAndTime from "./date-and-time";
import SearchBar from "./search-bar";
export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center bg-[#2b213f]  h-20 px-8 border-b-8 border-[#283342]">
        <SearchBar />
        <DateAndTime />
      </div>
    </>
  );
}
