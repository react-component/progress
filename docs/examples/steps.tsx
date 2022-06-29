import * as React from 'react';
import { useState } from 'react';
import { Circle } from 'rc-progress';

const Example = () => {

  const [percent, setPercent] = useState<number>(30);
  const [strokeWidth, setStrokeWidth] = useState<number>(20);
  const [steps, setSteps] = useState<number>(5);
  const [space, setSpace] = useState<number>(4);


  return (
    <div>
      <div>
        percent: <input
        id='range'
        type='range'
        min='0'
        max='100'
        value={percent}
        style={{ width: 300 }}
        onChange={(e) => setPercent(parseInt(e.target.value))} />
      </div>
      <div>
        strokeWidth: <input
        id='range'
        type='range'
        min='0'
        max='30'
        value={strokeWidth}
        style={{ width: 300 }}
        onChange={(e) => setStrokeWidth(parseInt(e.target.value))} />
      </div>
      <div>
        steps: <input
        id='range'
        type='range'
        min='0'
        max='15'
        value={steps}
        style={{ width: 300 }}
        onChange={(e) => setSteps(parseInt(e.target.value))} />
      </div>
      <div>
        space: <input
        id='range'
        type='range'
        min='0'
        max='15'
        value={space}
        style={{ width: 300 }}
        onChange={(e) => setSpace(parseInt(e.target.value))} />
      </div>
      <h3>Circle Progress:</h3>
      <div>percent: {percent}% </div>
      <div>strokeWidth: {strokeWidth}px</div>
      <div>steps: {steps}</div>
      <div>space: {space}px</div>

      <div style={{ width: 100 }}>
        <Circle
          percent={percent}
          strokeWidth={strokeWidth}
          steps={{
            count: steps,
            space: space,
          }}
          strokeColor={'red'}
        />
      </div>
    </div>
  );
};

export default Example;