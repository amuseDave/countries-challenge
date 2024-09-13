import { useQuery } from "@tanstack/react-query";
import CountryCard from "./CountryCard";

async function getCountry() {
  try {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const res = await fetch(
      "https://restcountries.com/v3.1/region/europe?fields=name,capital,currencies,continents,population,subregion,languages,flags,tld,borders"
    );
    const data = await res.json();
    if (!res.ok) throw { message: "couldn't fetch the countries data" };
    return data;
  } catch (error) {
    return error;
  }
}

export default function Countries() {
  const { data, isPending, isError, error } = useQuery({
    queryFn: getCountry,
    queryKey: ["countries"],
    staleTime: 1000000,
    gcTime: 1000000,
  });

  let dataFiltered;
  if (data && data.length > 0) {
    dataFiltered = data.slice(0, 8);
  }

  return (
    <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-y-16 gap-x-16 min-h-[50dvh]">
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
