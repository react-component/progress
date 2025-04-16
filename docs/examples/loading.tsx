import * as React from 'react';
import { Line, Circle } from '@rc-component/progress';

const Loading = () => {
  return (
    <div style={{ margin: 10, width: 200 }}>
      <Circle loading percent={10} />
      <Line loading percent={50} />
    </div>
  );
};

export default Loading;
