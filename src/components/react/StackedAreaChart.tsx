import { useState } from "react";
import _ from "lodash";
import { type LayoutBlock, makeLayout } from "yogurt-layout";
import {
  AreaData,
  Cartesian,
  Chart,
  Grid,
  stackNarrow,
  Style
} from "react-composable-charts";

const DebugYogurtLayout = ({ layout }: { layout: LayoutBlock }) => (
  <rect
    x={layout.left}
    y={layout.top}
    width={layout.width}
    height={layout.height}
    fill="none"
    stroke="black"
    strokeWidth={1}
    opacity={0.4}
  />
);

const categories = "ABCDE".split("");

const genData = () => _.flatten(
  _.range(40).map((i) =>
    categories.map((category) => ({ category, i, value: Math.random() }))
  )
);

export default function StackedAreaChart() {
  const [dataset, setDataset] = useState(genData());
  const [debug, setDebug] = useState(false);

  const width = 440;
  const height = 440;

  const layout = makeLayout({
    id: "root",
    width,
    height,
    direction: "row",
    padding: {
      top: 40,
      right: 20,
      bottom: 0,
      left: 20
    },
    children: [
      { id: "yLabels", width: 40 },
      {
        id: "wrapper",
        direction: "column",
        children: [{ id: "chart" }, { id: "xLabels", height: 40 }]
      }
    ]
  });

  const data = dataset

  const stackedData = stackNarrow({
    data: data,
    categories: categories,
    getValue: (d) => d.value,
    getCategory: (d) => d.category,
    getGroup: (d) => String(d.i)
  });

  const xDomain = [_.min(data.map((d) => d.i))!, _.max(data.map((d) => d.i))!];
  const yDomain = [
    _.min(stackedData.map((d) => d.base))!,
    _.max(stackedData.map((d) => d.to))!
  ];

  const colors = ["red", "yellow", "blue", "orange", "purple"];
  return (
    <div>
      <svg width={width} height={height}>
      {debug && (
        <>
          <DebugYogurtLayout layout={layout.root} />
          <DebugYogurtLayout layout={layout.yLabels} />
          <DebugYogurtLayout layout={layout.xLabels} />
          <DebugYogurtLayout layout={layout.chart} />
        </>
      )}

      <Chart {...layout.chart}>
        <Cartesian
          nice="y"
          x={{ scale: "linear", domain: xDomain }}
          y={{ scale: "linear", domain: yDomain }}
          color={{
            scale: "ordinal",
            domain: categories,
            range: ["red", "yellow", "blue", "orange", "purple"]
          }}
        >
          {categories.map((category, i) => (
            <AreaData
              curve="monotone-x"
              data={stackedData.filter((d) => d.category === category)}
              x={(d) => Number(d.group)}
              y={{ to: (d) => d.to, base: (d) => d.base }}
              fill={colors[i]}
              opacity={0.7}
            />
          ))}
          <Grid tickSize={50}>
            <Style stroke="black" strokeWidth={1}>
              <Grid.XLines />
              <Grid.YLines />
              <Grid.XAxes strokeWidth={2} />
              <Grid.YAxes strokeWidth={2} />
            </Style>
            <Grid.XLabels fill="black" padding={10} />
            <Grid.YLabels
              fill="black"
              padding={10}
              format={() => (tick) => (tick as number) * 100 + "%"}
            />
          </Grid>
        </Cartesian>
      </Chart>
      </svg>
      <div className="mt-4 flex [&>button:first-of-type]:mr-4">
        <button onClick={() => setDataset(genData)}>Regenerate</button>
        <button onClick={() => setDebug(!debug)}>Debug</button>
      </div>
    </div>
  );
}
