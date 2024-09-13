import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer";
import populationFormatter from "../util/populationFormatter";

export default function CountryCard({ country }) {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.uiSlicer.mode);

  let modeClasses;
  let modeSpan;

  if (mode === "dark") {
    modeClasses = "bg-gray-700 text-gray-50";
    modeSpan = "font-normal text-gray-300 transition-all";
  } else {
    modeClasses = "bg-gray-50 text-gray-950";
    modeSpan = "font-normal text-gray-600 transition-all";
  }

  function selectCountry() {
    dispatch(uiActions.selectCountry(country));
  }

  return (
    <div
      className="overflow-hidden rounded-md shadow-md max-w-[320px] cursor-pointer"
      onClick={selectCountry}
    >
      <img
        src={country.flags.png}
        alt={country.name.official}
        className="object-cover w-full h-[160px] brightness-95"
      />
      <div className={`h-full px-4 pt-5 pb-8 transition-all ${modeClasses}`}>
        <h2 className="mb-2 text-lg font-extrabold">{country.name.official}</h2>
        <p className="font-semibold">
          Population:{" "}
          <span className={modeSpan}>
            {populationFormatter(country.population)}
          </span>
        </p>
        <p className="font-semibold">
          Region: <span className={modeSpan}>{country.continents[0]}</span>
        </p>
        <p className="font-semibold">
          Capital: <span className={modeSpan}>{country.capital[0]}</span>
        </p>
      </div>
    </div>
  );
}
