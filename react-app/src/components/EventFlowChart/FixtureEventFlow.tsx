import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import D3EventFlowViz, { D3EventFlowVizData } from "./d3EventFlowChart";

const FixtureEventFlow = React.memo(
  ({ data }: { data: D3EventFlowVizData[] }) => {
    const [width, setWidth] = useState(window.screen.width - 20);
    const [height, setHeight] = useState(150);
    const d3ContainerRef = useRef(null);
    const viz = useRef<D3EventFlowViz | null>(null);

    useEffect(() => {
      if (d3ContainerRef.current && !viz.current) {
        viz.current = new D3EventFlowViz(d3ContainerRef.current, {
          width,
          height,
          margin: {
            top: 15,
            left: 15,
            right: 15,
            bottom: 15,
          },
          data,
        });
      }
    }, [d3ContainerRef.current, width, height, data]);

    useLayoutEffect(() => {
      if (viz.current) {
        viz.current.draw();
      }
    }, []);

    return <div ref={d3ContainerRef}></div>;
  }
);

export default FixtureEventFlow;
