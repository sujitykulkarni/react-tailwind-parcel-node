import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import D3EventFlowViz from "eventflowviz";
import { D3EventFlowData } from "eventflowviz/lib/typings";

/**
 * @description Component that renders event flow visualization using D3EventFlowViz
 */
const EventFlowChart = React.memo(
  ({
    data,
    id,
    ...restDivProps
  }: { data: D3EventFlowData[] } & Required<
    Pick<React.HTMLProps<HTMLDivElement>, "id">
  >) => {
    const [width, setWidth] = useState(window.screen.width - 20);
    const [height, setHeight] = useState(150);
    const d3ContainerRef = useRef(null);

    useEffect(() => {
      if (data.length) {
        const viz = new D3EventFlowViz({
          width,
          height,
          margin: {
            top: 15,
            left: 15,
            right: 15,
            bottom: 15,
          },
          id,
          data,
          dot: {
            radius: 15,
          },
        });
        viz.draw();
      }
    }, [d3ContainerRef.current, width, height, data]);

    if (!data.length) return <span>Loading...</span>;

    return (
      <div {...restDivProps} id={id} className="d3-event-flow">
        <svg className="svg"></svg>
      </div>
    );
  }
);

export default EventFlowChart;
