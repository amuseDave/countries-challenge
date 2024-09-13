import CountriesSearch from "./CountriesSearch";
import { useSelector } from "react-redux";

export default function Countries() {
  const mode = useSelector((state) => state.uiSlicer.mode);

  let modeClasses;

  if (mode === "dark") {
    modeClasses = "bg-gray-800 text-gray-300";
  } else {
    modeClasses = "bg-gray-200 text-gray-950";
  }
  return (
    <main className={`px-16 pb-8 pt-28 min-h-dvh ${modeClasses}`}>
      <CountriesSearch />
    </main>
  );
}
