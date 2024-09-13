import { useQuery } from "@tanstack/react-query";

async function getCountry() {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    if (!res.ok) throw { message: "couldn't fetch the countries data" };
    return data;
  } catch (error) {
    return error;
  }
}

export default function Countries() {
  // const { data, isPending, isError, error } = useQuery({
  //   queryFn: getCountry,
  //   queryKey: ["countries"],
  //   staleTime: 1000000,
  //   gcTime: 1000000,
  // });

  // console.log(data);
  // console.log(isPending);
  // console.log(isError);
  // console.log(error);

  return (
    <section className="grid grid-cols-4 min-h-[50dvh] content-center">
      <div className="w-16 h-16 border-2 border-t-4 border-gray-700 rounded-full  border-t-gray-300 animate-spin col-span-full justify-self-center"></div>
      {/* {isPending && (
        <div className="border-t-2 animate-spin border-gray-950 w-28 h-28"></div>
      )} */}
    </section>
  );
}
