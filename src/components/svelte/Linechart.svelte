<script>
  import { scalePoint, scaleLinear } from "d3-scale";
  import { line } from "d3-shape";
  import { max } from "d3-array";

  const countries = [
    "IT",
    "FR",
    "ES",
    "DE",
    "UK",
    "RU",
    "TR",
    "PL",
    "UA",
    "RO",
  ];

  const genData = () =>
    countries.map((country) => ({
      key: country,
      country,
      indicator: Math.random() * 10,
    }));

  $: data = genData();

  const width = 380;
  const height = 380;

  const margin = { top: 20, right: 20, bottom: 20, left: 40 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  $: xDomain = data.map((d) => d.country);
  $: yDomain = [0, max(data, (d) => d.indicator)];

  $: xScale = scalePoint().domain(xDomain).range([0, innerWidth]).padding(0.5);
  $: yScale = scaleLinear().domain(yDomain).range([innerHeight, 0]);

  const lineGenerator = line()
    .x((d) => xScale(d.country))
    .y((d) => yScale(d.indicator));

  function regenerateData() {
    data = genData();
  }
</script>

<svg {width} {height}>
  <g transform={`translate(${margin.left},${margin.top})`}>
    {#each yScale.ticks() as tickValue}
      <g transform={`translate(0, ${yScale(tickValue)})`}>
        <line x2={innerWidth} stroke="black" />
        <text text-anchor="end" x="-3" dy=".32em">
          {tickValue}
        </text>
      </g>
    {/each}
    {#each xScale.domain() as domainValue}
      <text y={innerHeight + 20} x={xScale(domainValue)} text-anchor="middle">
        {domainValue}
      </text>
    {/each}
    <path d={lineGenerator(data)} fill="none" stroke="steelblue" />
  </g>
</svg>

<button class="mt-4" on:click={regenerateData}>Regenerate</button>

<style>
  line,
  text,
  path {
    transition: all 1s ease-in-out;
  }
</style>
