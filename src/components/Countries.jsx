import { useQuery } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlicer";
import CountryCard from "./CountryCard";

async function getCountry(search) {
  try {
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, 500);
    // });

    const fields =
      "?fields=name,capital,currencies,population,subregion,languages,flags,tld,borders,region";

    const res = await fetch(
      `https://restcountries.com/v3.1/${
        !search ? "all" : `name/${search}`
      }${fields}`
    );
    const data = await res.json();
    if (!res.ok) throw { message: "couldn't fetch the countries data" };
    return data;
  } catch (error) {
    return error;
  }
}

export default function Countries() {
  const dispatch = useDispatch();
  const randomStart = useSelector((state) => state.uiSlicer.randomStart);
  const filterBy = useSelector((state) => state.uiSlicer.filterBy);
  const search = useSelector((state) => state.uiSlicer.search);

  const { data, isPending, isError, error } = useQuery({
    queryFn: () => {
      return getCountry(search);
    },
    queryKey: [search],
    staleTime: 1000000,
    gcTime: 1000000,
  });

  let dataFiltered;
  if (data && data.length > 0) {
    let randomStartNum;
    let randomEndNum;

    if (randomStart === undefined) {
      randomStartNum = Math.floor(Math.random() * data.length - 20);
      randomStartNum = randomStartNum < 0 ? 0 : randomStartNum;
      dispatch(uiActions.setRandomSearch(randomStartNum));
    } else {
      randomStartNum = randomStart;
    }
    randomEndNum = randomStartNum + 20;

    if (!filterBy || filterBy === "all") {
      if (!search) dataFiltered = data.slice(randomStartNum, randomEndNum);
      else dataFiltered = [...data];
    } else {
      dataFiltered = data.filter((data) => {
        return data.region.toLowerCase() === filterBy;
      });
    }
  }

  return (
    <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16 gap-x-16 min-h-[50dvh] justify-center">
      {isPending && (
        <div className="items-center self-center w-16 h-16 border-2 border-t-4 border-gray-700 rounded-full border-t-gray-300 animate-spin col-span-full justify-self-center"></div>
      )}

      {dataFiltered
        ? dataFiltered.map((country) => {
            return <CountryCard key={country.name.common} country={country} />;
          })
        : null}
    </section>
  );
}
