import { useSelector } from "react-redux";

export default function CountryCard({
  png,
  name,
  population,
  continent,
  capital,
}) {
  const mode = useSelector((state) => state.uiSlicer.mode);

  return (
    <div className="overflow-hidden rounded-md shadow-md max-w-[320px]">
      <img
        src={png}
        alt="country-flag"
        className="object-cover w-full h-[160px] brightness-95"
      />
      <div className="h-full px-4 pt-5 pb-8 bg-gray-700 text-gray-50">
        <h2 className="mb-2 text-lg font-extrabold">{name}</h2>
        <p className="font-semibold">
          Population:{" "}
          <span className="font-normal text-gray-300">{population}</span>
        </p>
        <p className="font-semibold">
          Region: <span className="font-normal text-gray-300">{continent}</span>
        </p>
        <p className="font-semibold">
          Capital: <span className="font-normal text-gray-300">{capital}</span>
        </p>
      </div>
    </div>
  );
}
