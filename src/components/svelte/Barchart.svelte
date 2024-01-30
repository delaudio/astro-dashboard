<script>
  import { scaleBand, scaleLinear } from "d3-scale";

  const countries = [
    "Italy",
    "France",
    "Spain",
    "Germany",
    "UK",
    "Russia",
    "Turkey",
    "Poland",
    "Ukraine",
    "Romania",
  ];

  const genData = () =>
    countries.map((country) => ({
      key: country,
      country,
      indicator: Math.random() * 10,
    }));

  $: data = genData();

  const width = 440;
  const height = 400;

  const margin = { top: 20, right: 20, bottom: 20, left: 80 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  $: xDomain = data.map((d) => d.country);
  $: yDomain = data.map((d) => +d.indicator);

  $: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1);
  $: xScale = scaleLinear()
    .domain([0, Math.max.apply(null, yDomain)])
    .range([0, innerWidth]);

  function regenerateData() {
    const newData = genData();
    data = data.map((d) => {
      const newDataEntry = newData.find((nd) => nd.country === d.country);
      return newDataEntry ? { ...d, indicator: newDataEntry.indicator } : d;
    });
  }
</script>

<svg {width} {height}>
  <g transform={`translate(${margin.left},${margin.top})`}>
    {#each xScale.ticks() as tickValue}
      <g transform={`translate(${xScale(tickValue)},0)`}>
        <line y2={innerHeight} stroke="black" />
        <text text-anchor="middle" dy=".71em" y={innerHeight + 3}>
          {tickValue}
        </text>
      </g>
    {/each}
    {#each data as d (d.country)}
      <text
        text-anchor="end"
        x="-3"
        dy=".32em"
        y={yScale(d.country) + yScale.bandwidth() / 2}
      >
        {d.country}
      </text>
      <rect
        x="0"
        y={yScale(d.country)}
        width={xScale(d.indicator)}
        height={yScale.bandwidth()}
        fill="steelblue"
      />
    {/each}
  </g>
</svg>

<button class="mt-4" on:click={regenerateData}>Regenerate</button>

<style>
  line,
  text,
  rect {
    transition: width 1s ease-in-out;
  }
</style>
