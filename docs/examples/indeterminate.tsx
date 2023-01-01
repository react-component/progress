import * as React from 'react';
import { Line, Circle } from 'rc-progress';

const Indeterminate = () => {
  return (
    <div style={{ margin: 10, width: 200 }}>
      <Circle />
      <Line />
    </div>
  );
};

export default Indeterminate;
