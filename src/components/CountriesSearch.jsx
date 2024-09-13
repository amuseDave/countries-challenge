import { Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer";
import { useRef } from "react";
export default function CountriesSearch() {
  const mode = useSelector((state) => state.uiSlicer.mode);
  const search = useSelector((state) => state.uiSlicer.search);
  const dispatch = useDispatch();
  const timeoutRef = useRef();

  let modeClasses;
  let modeClassesIcon;
  const classes =
    "rounded-sm shadow-lg focus:outline outline-2 font-semibold transition-all";

  if (mode === "dark") {
    modeClasses =
      "bg-gray-700 text-gray-100 placeholder:text-gray-300 outline-gray-200";
    modeClassesIcon = "text-gray-200";
  } else {
    modeClasses =
      "bg-gray-50 text-gray-800 placeholder:text-gray-600 outline-gray-400";
    modeClassesIcon = "text-gray-500";
  }

  function handleFilter(e) {
    dispatch(uiActions.filterCountries(e.target.value));
  }

  function handleSearch(e) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      dispatch(uiActions.setSearchQuery(e.target.value));
    }, 600);
  }

  return (
    <aside className="flex justify-between mb-10">
      <div className="relative flex-1 max-w-[480px] flex mr-10">
        <input
          className={`flex-1 py-3 pl-16 ${modeClasses} ${classes}`}
          placeholder="Search for a country..."
          type="text"
          onChange={handleSearch}
          defaultValue={search}
        />
        <Search
          size="24"
          className={`absolute -translate-y-1/2 cursor-pointer left-6 top-1/2 ${modeClassesIcon} transition-all`}
          onClick={() => {
            console.log("sw");
          }}
        />
      </div>

      <select
        className={`pl-4 pr-10 ${modeClasses} ${classes}`}
        onChange={handleFilter}
      >
        <option defaultChecked hidden>
          Filter by Region
        </option>
        <option value="all">All</option>
        <option value="africa">Africa</option>
        <option value="americas">America</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="oceania">Oceania</option>
      </select>
    </aside>
  );
}
