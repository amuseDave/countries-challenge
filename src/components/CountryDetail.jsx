import { useSelector, useDispatch } from "react-redux";
import { MoveLeft } from "lucide-react";
import { uiActions } from "../store/uiSlicer";
import populationFormatter from "../util/populationFormatter";

export default function CountryDetail({ country }) {
  const mode = useSelector((state) => state.uiSlicer.mode);
  const dispatch = useDispatch();
  function handleDeselectCountry() {
    dispatch(uiActions.deselectCountry());
  }

  let modeClasses;
  let modeClassesBtn;
  let modeSpan;

  if (mode === "dark") {
    modeSpan = "text-gray-300 ml-1 font-normal";
    modeClasses = "text-gray-50";
    modeClassesBtn = "text-gray-300 bg-gray-700";
  } else {
    modeClasses = "text-gray-950";
    modeClassesBtn = "text-gray-700 bg-gray-50";
    modeSpan = "text-gray-800 ml-1 font-normal";
  }

  console.log(country);
  console.log([...Object.values(country.languages)]);

  return (
    <section className="max-w-[1100px]">
      <nav className="mt-4 mb-16">
        <button
          onClick={handleDeselectCountry}
          className={`px-6 py-[6px] shadow-md text-base rounded font-semibold ${modeClassesBtn}`}
        >
          <MoveLeft size={18} strokeWidth={2.8} className="inline-block mr-3" />
          Back
        </button>
      </nav>
      <div className="grid grid-cols-2 gap-16">
        <img
          src={country.flags.png}
          alt=""
          className="object-cover min-h-[360px] rounded-sm "
        />

        <div className={`self-center ${modeClasses}`}>
          <h1 className="text-3xl font-bold mb-7">{country.name.official}</h1>
          <div className="grid grid-cols-2 mb-16">
            <div>
              <p className="mb-1 font-bold">
                Native Name: <span className={modeSpan}></span>
              </p>
              <p className="mb-1 font-bold">
                Population:{" "}
                <span className={modeSpan}>
                  {populationFormatter(country.population)}
                </span>
              </p>
              <p className="mb-1 font-bold">
                Region:{" "}
                <span className={modeSpan}>{country.continents[0]}</span>
              </p>
              <p className="mb-1 font-bold">
                Sub Region: <span className={modeSpan}></span>
              </p>
              <p className="font-bold">
                Capital: <span className={modeSpan}>{country.capital[0]}</span>
              </p>
            </div>
            <div>
              <p className="mb-1 font-bold">
                Top Level Domain:{" "}
                <span className={modeSpan}>{country.tld[0]}</span>
              </p>
              <p className="mb-1 font-bold">
                Currencies:{" "}
                <span className={modeSpan}>
                  {country.currencies[Object.keys(country.currencies)].name}
                </span>
              </p>
              <p className="font-bold">
                Languages:{" "}
                <span className={modeSpan}>
                  {[...Object.values(country.languages)].join(", ")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
