import React from 'react';

import {Line } from 'react-konva';

import { LineConfig } from 'konva/lib/shapes/Line';



interface IProps extends LineConfig {}

export const Cell: React.FC<IProps> = ({ ...rest }) => {
  return (
    <>
      <Line
        {...rest}
      />

    </>
  )
}