import { useState } from "react";
import {
  Cartesian,
  Chart,
  ClipChart,
  ClipRect,
  element,
  Grid,
  LabelsData,
  PointData
} from "react-composable-charts";
import { makeLayout, type LayoutBlock } from "yogurt-layout";
import _ from "lodash";

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

const keys = "abcdefghilmnopq".split("");
const genData = () =>
  _.shuffle(keys)
    .slice(0, 2 + Math.random() * 20)
    .map((key) => ({ key, x: Math.random() * 100, y: Math.random() }));

export default function Scatterplot() {
  const [dataset, setDataset] = useState(genData());
  const [debug, setDebug] = useState(false);

  const layout = makeLayout({
    id: "root",
    width: 440,
    height: 440,
    padding: 40,
    children: [{ id: "chart" }]
  });

  const x = (d: typeof dataset[number]) => d.x;
  const y = (d: typeof dataset[number]) => d.y;
  const xDomain = [Math.min(...dataset.map(x)), Math.max(...dataset.map(x))];
  const yDomain = [Math.min(...dataset.map(y)), Math.max(...dataset.map(y))];

  return (
    <div>
      <svg width={layout.root.width} height={layout.root.height}>
      {debug && (
        <>
          <DebugYogurtLayout layout={layout.root} />
          <DebugYogurtLayout layout={layout.chart} />
        </>
      )}
        <Chart {...layout.chart}>
          <Cartesian
            x={{ scale: "linear", domain: xDomain }}
            y={{ scale: "linear", domain: yDomain }}
            nice
          >
            <Grid>
              <element.rect
                x={layout.chart.left}
                y={layout.chart.top}
                width={layout.chart.width}
                height={layout.chart.height}
                stroke="black"
                fill="none"
                opacity={0.4}
              />
              <ClipChart>
                <Grid.XLines stroke="black" opacity={0.4} />
                <Grid.YLines stroke="black" opacity={0.4} />
                <Grid.XAxes stroke="black" />
                <Grid.YAxes stroke="black" />
              </ClipChart>

              <ClipRect {...layout.root}>
                <Grid.XLabels fill="black" padding={10} />
                <Grid.YLabels fill="black" padding={10} />
              </ClipRect>
            </Grid>

            <PointData
              data={dataset}
              x={(d) => d.x}
              y={(d) => d.y}
              r={4}
              fill="teal"
              dataKey={(d) => d.key}
              opacity={1}
              enter={{ opacity: 0 }}
            />

            <LabelsData
              data={dataset}
              dataX={x}
              dataY={y}
              offsetY={-10}
              fontSize={20}
              text={(d) => d.key.toUpperCase()}
              textAnchor="middle"
              opacity={1}
              dataKey={(d) => d.key}
              enter={{ opacity: 0 }}
            />
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
