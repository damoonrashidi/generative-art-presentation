import { useState } from 'react';
import { CodePane, Slide } from 'spectacle';
import { ColorMethod, ForcesColorViz } from '../viz/ForcesColorViz';
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
      [100, 70, 81],
      [0, 1, 81],
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
  const [colorMethod, setColorMethod] = useState<ColorMethod>(
    ColorMethod.FROM_PALETTE
  );

  return (
    <Slide backgroundColor="#fff">
      <div className="center column mid">
        <CodePane
          language="typescript"
          showLineNumbers={false}
          highlightRanges={[
            [1, 4],
            [16, 18],
            [19, 21],
            [5, 9],
            [12, 14],
          ]}
        >
          {`
const colors = {
  background: 'hsla(${colors.background.join(',')})',
  palette: [${colors.palette.slice(0, 2).map((c) => `'hsla(${c})'`)}, ...],
};
const regions: lib.Shape[] = [
  lib.createShape([0, 0], width / 2),
  lib.createShape([width, 0], width / 2),
  lib.createShape([0, height], width / 2),
  lib.createShape([width, height], width / 2),
];

const coloredRegions = colorRegions(
  regions, colors.palette
);

for (let i = 0; i < lines.length; i++) {
  if (colorMethod === ColorMethod.FROM_PALETTE) {
    context.fillStyle = lib.fromPalette(colors.palette);
  } else if (colorMethod === ColorMethod.BY_REGION) {
    const region = findRegion(x,y, regions);
    context.fillStyle = coloredRegions.color;
  }
}
            `}
        </CodePane>
        <div className="center stack">
          <ForcesColorViz
            colors={colors}
            seed={seed}
            colorMethod={colorMethod}
          />
          <div className="center stack">
            <button onClick={() => setSeed(lib.randomInt(0, 100))}>
              Seed: {seed}
            </button>

            <div className="center column">
              Palette:
              <select
                onChange={(e) => {
                  const map: Record<string, Colors> = {
                    autumn,
                    night,
                    day,
                  };

                  setColors(map[e.target.value]);
                }}
              >
                <option value="autumn">Autumn</option>
                <option value="night">Night</option>
                <option value="day">Day</option>
              </select>
            </div>

            <div className="center column">
              Color method:{' '}
              <select
                onChange={(e) => {
                  setColorMethod(e.target.value as ColorMethod);
                }}
              >
                <option value={ColorMethod.FROM_PALETTE}>Random</option>
                <option value={ColorMethod.BY_REGION}>By Region</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
