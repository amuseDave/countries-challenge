import { useSelector, useDispatch } from "react-redux";
import { MoveLeft } from "lucide-react";
import { uiActions } from "../store/uiSlicer";
import populationFormatter from "../util/populationFormatter";
import { useQuery } from "@tanstack/react-query";

async function getBorderNames(borders) {
  const allBorders = borders.join(",").toLowerCase();

  if (borders.length === 0) return [{ name: { common: "No borders" } }];

  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
    const res = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${allBorders}&fields=name`
    );
    const data = await res.json();
    if (!res.ok) throw { message: "couldn't fetch the countries data" };
    return data;
  } catch (error) {
    return error;
  }
}

export default function CountryDetail({ country }) {
  const { isPending, data, isError, error } = useQuery({
    queryFn: () => {
      return getBorderNames(country.borders);
    },
    queryKey: [country.name.official],
  });

  const mode = useSelector((state) => state.uiSlicer.mode);
  const dispatch = useDispatch();
  function handleDeselectCountry() {
    dispatch(uiActions.deselectCountry());
  }

  let modeClasses;
  let modeClassesBtn;
  let modeSpan;
  let modeTag;

  if (mode === "dark") {
    modeSpan = "text-gray-300 ml-1 font-normal transition-all";
    modeClasses = "text-gray-50 transition-all";
    modeClassesBtn = "text-gray-300 bg-gray-700 transition-all";
    modeTag = "text-gray-300 bg-gray-700 transition-all";
  } else {
    modeClasses = "text-gray-950 transition-all";
    modeClassesBtn = "text-gray-700 bg-gray-50 transition-all";
    modeSpan = "text-gray-800 ml-1 font-normal transition-all";
    modeTag = "text-gray-800 bg-gray-100 transition-all";
  }

  return (
    <section className="max-w-[1100px]">
      <nav className="mt-4 mb-16">
        <button
          onClick={handleDeselectCountry}
          className={`px-6 py-[6px] shadow-md text-base rounded font-semibold ${modeClassesBtn} `}
        >
          <MoveLeft size={18} strokeWidth={2.8} className="inline-block mr-3" />
          Back
        </button>
      </nav>
      <div className="grid grid-cols-[480px_1fr] gap-16">
        <img
          src={country.flags.png}
          alt=""
          className="object-cover min-h-[360px] rounded-sm "
        />

        <div className={`self-center ${modeClasses} `}>
          <h1 className="text-3xl font-bold mb-7">{country.name.official}</h1>
          <div className="grid grid-cols-2 mb-16">
            <div>
              <p className="mb-1 font-bold">
                Native Name:{" "}
                <span className={modeSpan}>{country.name.common}</span>
              </p>
              <p className="mb-1 font-bold">
                Population:{" "}
                <span className={modeSpan}>
                  {populationFormatter(country.population)}
                </span>
              </p>
              <p className="mb-1 font-bold">
                Region: <span className={modeSpan}>{country.region}</span>
              </p>
              <p className="mb-1 font-bold">
                Sub Region:{" "}
                <span className={modeSpan}>{country.subregion}</span>
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

          <div className="flex flex-wrap items-center gap-4">
            <p className="font-bold text-nowrap">Border Countries:</p>
            {isPending && (
              <div className="items-center self-center w-5 h-5 ml-5 border-2 border-t-4 border-gray-700 rounded-full border-t-gray-300 animate-spin col-span-full justify-self-center"></div>
            )}

            {data
              ? data.map((border, index) => {
                  return (
                    <div
                      key={index}
                      className={`p-1  text-center rounded shadow-md min-w-24 ${modeTag}`}
                    >
                      {border.name.common}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </section>
  );
}
