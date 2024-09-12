export default function Countries() {
  return (
    <main className="bg-gray-800 min-h-dvh px-12 pt-24 pb-8">
      <aside className="flex justify-between mb-10">
        <input
          className="bg-gray-700 text-gray-200 placeholder:text-gray-200"
          placeholder="Search for a country..."
          type="text"
        />

        <select className="bg-gray-700 text-gray-200">
          <option selected disabled hidden>
            Filter by Region
          </option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </aside>
    </main>
  );
}
