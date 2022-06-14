import React, { useRef } from "react";
import { Layer, Line, Stage } from "react-konva";

interface IProps { }

const LineComponent = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {[1, 2].map((i) => {
          return (
            <Line
              id={""}
              points={[10, 20, 100, 20, 100, 100, 10, 100]}
              fill="red"
              closed={true}
              draggable={true}
            />
          );
        })}

        {/* <Transformer ref={transformerRef} /> */}
      </Layer>
    </Stage>
  );
};

export default LineComponent;
