import Countries from "./Countries";
import CountriesSearch from "./CountriesSearch";
import { useSelector } from "react-redux";
import CountryDetail from "./CountryDetail";

export default function Main() {
  const selectedCountry = useSelector(
    (state) => state.uiSlicer.selectedCountry
  );
  const mode = useSelector((state) => state.uiSlicer.mode);

  let modeClasses;

  if (mode === "dark") {
    modeClasses = "bg-gray-800 text-gray-300";
  } else {
    modeClasses = "bg-gray-200 text-gray-950";
  }
  return (
    <main
      className={`sm:px-16 px-8 pb-8 pt-28 min-h-dvh ${modeClasses} transition-all`}
    >
      {!selectedCountry && (
        <>
          <CountriesSearch /> <Countries />
        </>
      )}
      {selectedCountry && (
        <>
          <CountryDetail country={selectedCountry} />
        </>
      )}
    </main>
  );
}
