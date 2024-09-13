export default function populationFormatter(population) {
  const local = navigator.language;

  return new Intl.NumberFormat(local, {
    useGrouping: true, // removes separators}).format(number)
  }).format(population);
}
