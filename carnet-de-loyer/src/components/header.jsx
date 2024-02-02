import DateAndTime from "./date-and-time";
import SearchBar from "./search-bar";
export default function Header() {
  return (
    <>
      <div className="flex justify-between items-center bg-[#F7FAFD]  h-20 px-5">
        <SearchBar />
        <DateAndTime />
      </div>
    </>
  );
}
