import { useState } from 'react';
import { CodePane, Slide } from 'spectacle';
import { ForcesColorViz } from '../viz/ForcesColorViz';
import { Colors } from '../viz/ForcesColorViz';
import './slides.css';
import * as lib from '../lib';

export function ForcesColor() {
  const autumn: Colors = {
    background: [48, 20, 9],
    palette: [
      [0, 100, 98],
      [75, 100, 81],
      [34, 61, 91],
      [28, 82, 56],
      [0, 8, 21],
      [0, 44, 44],
    ],
  };

  const night: Colors = {
    background: [120, 25, 5],
    palette: [
      [40, 52, 88],
      [48, 24, 46],
      [0, 2, 38],
      [214, 29, 41],
    ],
  };

  const day: Colors = {
    background: [180, 2, 88],
    palette: [
      [0, 100, 100],
      [44, 100, 94],
      [192, 100, 94],
      [193, 27, 76],
      [0, 8, 21],
      [0, 44, 44],
    ],
  };

  const [colors, setColors] = useState<Colors>(autumn);
  const [seed, setSeed] = useState(100);

  return (
    <Slide backgroundColor="#fff">
      <div className="center column mid">
        <CodePane language="typescript" showLineNumbers={false}>
          {`
const colors = {
  background: '#eee',
  palette: ['#f44336', '#e91e63', '#9c27b0', '#673ab7'],
};


for (let i = 0; i < lines.length; i++) {
  context.fillStyle = lib.fromPaletee(colors.palette);

  // Draw the line
}
            `}
        </CodePane>
        <div className="center stack">
          <ForcesColorViz colors={colors} seed={seed} />
          <div className="center stack">
            <button onClick={() => setSeed(lib.randomInt(0, 100))}>
              Seed: {seed}
            </button>

            <div className="center column">
              {' '}
              Palette:{' '}
              <select
                onChange={(e) => {
                  if (e.target.value === 'autumn') {
                    setColors(autumn);
                  } else if (e.target.value === 'night') {
                    setColors(night);
                  } else if (e.target.value === 'day') {
                    setColors(day);
                  }
                }}
              >
                <option value="autumn">Autumn</option>
                <option value="night">Night</option>
                <option value="day">Day</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
