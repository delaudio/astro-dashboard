import { useState } from "react";
import _ from "lodash";
import {
  Chart,
  Cartesian,
  Grid,
  BarData,
  stackNarrow,
} from "react-composable-charts";
import * as d3 from "d3";

const categories = ["Cat 1", "Cat 2", "Cat 3"];
const series = "ABCDEFGHIJ".split("");

const genData = () => {
  return _.flatten(
    series.map((serie) => {
      let total = 0;
      const serieData = categories.map((category) => {
        const value = Math.random() * 100;
        total += value;
        return { serie, category, value };
      });
      return serieData;
    })
  );
};

export default function StackedBarchart() {
  const [dataset, setDataset] = useState(genData());
  const width = 440;
  const height = 440;
  const padding = 40;

  const categories = ["Cat 1", "Cat 2", "Cat 3"];
  const stackedData = stackNarrow({
    data: dataset,
    categories,
    getCategory: (d) => d.category,
    getGroup: (d) => d.serie,
    getValue: (d) => d.value,
  });

  const xDomain = [...new Set(stackedData.map((d) => d.group))];
  const yDomain = d3.extent(stackedData, (d) => d.to) as [number, number];
  return (
    <div>
      <svg width={width} height={height}>
        <Chart
          top={padding}
          left={padding}
          width={width - padding * 2}
          height={height - padding * 2}
        >
          <Cartesian
            x={{ scale: "band", domain: xDomain, paddingInner: 0.1 }}
            y={{ scale: "linear", domain: yDomain }}
            color={{
              scale: "ordinal",
              domain: categories,
              range: ["royalblue", "lightskyblue", "dodgerblue"],
            }}
            nice
          >
            <Grid>
              <Grid.XLines stroke="grey" />
              <Grid.YLines stroke="grey" />
              <Grid.XLabels padding={5} />
              <Grid.YLabels padding={5} />
            </Grid>

            {categories.map((cat) => (
              <BarData
                data={stackedData.filter((d) => d.category === cat)}
                x={(d) => d.group}
                y={{ to: (d) => d.to, base: (d) => d.base }}
                fill={(d) => d.category.toString()}
              />
            ))}

            <Grid>
              <Grid.XAxes stroke="black" strokeWidth={2} />
              <Grid.YAxes stroke="black" strokeWidth={2} />
            </Grid>
          </Cartesian>
        </Chart>
      </svg>
      <div className="mt-4 flex [&>button:first-of-type]:mr-4">
        <button onClick={() => setDataset(genData)}>Regenerate</button>
      </div>
    </div>
  );
}
