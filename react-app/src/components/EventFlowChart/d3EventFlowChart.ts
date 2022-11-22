import * as d3 from "d3";

export type D3EventFlowVizData = {
  time: Date;
  event: string;
  label?: string;
  size?: number;
};

type D3EventFlowVizProps = {
  width: number;
  height: number;
  margin: Record<"top" | "right" | "bottom" | "left", number>;
  dot?: {
    radius: number;
  };
  data: D3EventFlowVizData[];
};
const WIDTH = 500;
const HEIGHT = 500;
const TOP = 10;
const RIGHT = 10;
const LEFT = 10;
const BOTTOM = 10;
const DOT_RADIUS = 15;
const DOT_COLOR = "#93c5fd";
const AXIS_COLOR = "#64748b";
const LABEL_COLOR = "#1e293b";
const BASE_FONT_SIZE = 10;

const initProps = {
  width: WIDTH,
  height: HEIGHT,
  margin: { top: TOP, right: RIGHT, left: LEFT, bottom: BOTTOM },
  dot: {
    radius: DOT_RADIUS,
  },
  data: [],
};

export default class D3EventFlowViz {
  private svg;
  private props: Required<D3EventFlowVizProps> = initProps;
  constructor(
    element: any,
    { width, height, margin, dot, data }: D3EventFlowVizProps
  ) {
    this.props = {
      width: width - margin.left - margin.right,
      height: height - margin.top - margin.bottom,
      margin,
      dot: dot || initProps.dot,
      data,
    };
    this.svg = d3
      .select(element)
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height);
  }

  draw = () => {
    const { data, width, height, margin, dot } = this.props;
    if (!data.length || !this.svg) return;
    const times = data.map((d) => d.time.getTime());
    const sizes = data.map((d) => d.size || 0);
    const min = Math.min(...times);
    const max = Math.max(...times);
    const maxSize = Math.max(...sizes);
    const minSize = Math.min(...sizes);
    const cy = 0 - dot.radius;

    const colorScale = d3
      .scaleSequential()
      .domain([minSize, maxSize])
      .interpolator(d3.interpolateWarm)
      .clamp(true);

    const timeScale = d3
      .scaleTime()
      .domain([new Date(min), new Date(max)])
      .range([0, width]);

    const linearScale = d3
      .scaleLinear()
      .domain([minSize, maxSize])
      .range([5, DOT_RADIUS]);

    const xAxis = d3
      .axisBottom(timeScale)
      .tickArguments([d3.timeWeek.every(2)]);

    const shapeGroup = this.svg
      .append("g")
      .style(
        "transform",
        `translate(${margin.left}px,${height - margin.top - margin.bottom}px)`
      )
      .style("font-size", `${BASE_FONT_SIZE}px`);

    shapeGroup
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => timeScale(d.time))
      .attr("cy", cy)
      .attr("r", (d) => linearScale(d.size))
      .attr("fill", (d) => colorScale(d.size || 0))
      .attr("stroke", "white")
      .attr("style", `transform:translateY(-${dot.radius / 2}px)`)
      .exit()
      .remove();
    shapeGroup
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d, i) => d.label || i)
      .attr("x", (d) => timeScale(d.time))
      .attr("y", (d) => 0 - linearScale(d.size || 0) * 2 - BASE_FONT_SIZE - 10)
      .attr("text-anchor", "middle")
      .attr("font-size", `${BASE_FONT_SIZE}px`)
      .attr("fill", LABEL_COLOR)
      .exit()
      .remove();
    shapeGroup.call(xAxis).attr("color", AXIS_COLOR);
  };

  remove = () => this.svg.exit().remove();
}
