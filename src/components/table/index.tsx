import React, {  useEffect, useRef, useState } from 'react';

import { Group, Layer, Line, Stage, Transformer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Cell } from './Cell';


interface IProps {
  rows: number,
  cols: number
}

interface IPosition {
  x_start: number;
  y_start: number;
  x_end: number;
  y_end: number;
}

interface ILines {
  [key: number]: IPosition;
}


const Table: React.FC<IProps> = ({ cols, rows }) => {

  const [winddowDimensions, setWinddowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [canvasDimension, setCanvasDimension] = useState({
    width: 0,
    height: 0,
  });

  const [offset, setOffset] = useState({
    x: 0,
    y: 0,
  });

  const [verticalLines, setVerticalLines] = useState<ILines>({});
  const [horizontalLines, setHorizontalLines] = useState<ILines>({});



  useEffect(() => {
    
    /* this useEffect will re-compile when rows or colums are changed*/

    const cell_height = canvasDimension.height / rows
    const cell_width = canvasDimension.width / cols

    /* To set rows*/
    let rowStartIndex = 0
    let rowStopIndex = rows

    /* To set colums*/
    let columnStartIndex = 0
    let columnStopIndex = cols

    let hor: ILines = {}

    for (
      let columnIndex = columnStartIndex;
      columnIndex <= columnStopIndex;
      columnIndex++
    ) {
      const x_start_col = (cell_width * columnIndex) + offset.x
      hor[columnIndex] = {
        x_start: x_start_col,
        y_start: offset.y,
        x_end: x_start_col,
        y_end: offset.y + canvasDimension.height
      }
    }
    setHorizontalLines(hor)

    let ver: ILines = {}
    for (let rowIndex = rowStartIndex; rowIndex <= rowStopIndex; rowIndex++) {
      const y = (cell_height * rowIndex) + offset.y
      ver[rowIndex] = {
        x_start: offset.x,
        y_start: y,
        x_end: offset.x + canvasDimension.width,
        y_end: y
      }
    }
    setVerticalLines(ver)
  }, [rows, cols])

  const handleResize = () => {
    setWinddowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    const canvasWidth = winddowDimensions.width - 400
    const canvasHeight = winddowDimensions.height - 300

    const containerWidth = canvasWidth / 2
    const containerHeight = canvasHeight / 2

    setCanvasDimension({
      height: containerHeight,
      width: containerWidth,
    })

    setOffset({
      x: (canvasWidth - containerWidth) / 2,
      y: (canvasHeight - containerHeight) / 2
    })
  }

  React.useEffect(() => {
    /* to resize the canvas size*/
    handleResize()
  }, [rows, cols]);

  const dragHandle = (points: number[], index: number, horizontal: boolean) => {
    /* this function is used to update the points*/
    if (horizontal) {
      let hor = { ...horizontalLines }
      hor[index].x_start = points[0]
      hor[index].x_end = points[0]
      setHorizontalLines(hor)
    } else {
      let ver = { ...verticalLines }
      ver[index].y_start = points[1]
      ver[index].y_end = points[1]
      setVerticalLines(ver)
    }
  }

  return (
    <div className="content" id='content'>
      <Stage className="main-stage" width={winddowDimensions.width - 400} height={winddowDimensions.height - 300} style={{ border: '1px solid black' }} >
        <Layer>
          <Group
            draggable
          >
            {Object.values(horizontalLines).map((position, index) =>
              <Cell
                key={`h-${index}`}
                points={[position.x_start, position.y_start, position.x_end, position.y_end]}
                stroke="blue"
                strokeWidth={7}
                draggable={true}
                onDragMove={(evt: KonvaEventObject<DragEvent>) => {
                  console.log(evt)
                  dragHandle(evt.target.attrs.points, index, true)
                }}
              />
            )}
            {Object.values(verticalLines).map((position, index) =>
              <Cell
                key={`v-${index}`}
                points={[position.x_start, position.y_start, position.x_end, position.y_end]}
                stroke="blue"
                strokeWidth={7}
                draggable={true}
                onDragMove={(evt: KonvaEventObject<DragEvent>) => {
                  dragHandle(evt.target.attrs.points, index, false)
                }}
              />
            )}
          </Group>
        </Layer>
      </Stage>

    </div>

  )
}

/* default props */
Table.defaultProps = {
  rows: 10,
  cols: 10
}

export default Table