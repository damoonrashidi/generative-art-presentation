import { useState } from 'react';
import { CodePane, Slide } from 'spectacle';
import { NoiseLineViz } from '../viz/NoiseLineViz';
import * as lib from '../lib';
import './slides.css';

export function NoiseLineFunction() {
  const [seed, setSeed] = useState(0);
  const [smoothness, setSmoothness] = useState(1);
  const [turbulance, setTurbulance] = useState(1);

  return (
    <Slide backgroundColor="#fff">
      <div className="center column mid">
        <CodePane
          language="typescript"
          showLineNumbers={false}
          highlightRanges={[[1, 2], 3, [13, 19], [5, 11], 3]}
        >
          {`
            for (let x = 0; x < width; x += width / 20) {
              for (let y = 0; y < height; y += height / 20) {
                const n = noise(x${
                  smoothness === 1 ? '' : ' / ' + smoothness
                }, y${smoothness === 1 ? '' : ' / ' + smoothness}, ${seed});

                /**
                 * For the two points 
                 * [120, 190] and [125, 195]
                 * Distance: ${lib
                   .distance(
                     [120 / smoothness, 190 / smoothness],
                     [125 / smoothness, 195 / smoothness]
                   )
                   .toFixed(4)} points
                 *
                 * noise(${(120 / smoothness).toPrecision(4)}, ${(
            190 / smoothness
          ).toPrecision(4)}) = ${lib.Noise.simplex(
            120 / smoothness,
            190 / smoothness,
            seed
          ).toPrecision(4)}
                 * noise(${(125 / smoothness).toPrecision(4)}, ${(
            195 / smoothness
          ).toPrecision(4)}) = ${lib.Noise.simplex(
            125 / smoothness,
            195 / smoothness,
            seed
          ).toPrecision(4)}
                 **/

                context.beginPath();
                context.moveTo(x, y);
                context.lineTo(
                  x + Math.cos(n${
                    turbulance === 1 ? '' : ' * ' + turbulance
                  }) * lineLength,
                  y + Math.sin(n${
                    turbulance === 1 ? '' : ' * ' + turbulance
                  }) * lineLength
                );
                context.stroke();
              }
            }
            `}
        </CodePane>
        <div className="center stack">
          <NoiseLineViz
            seed={seed}
            smoothness={smoothness}
            turbulence={turbulance}
          ></NoiseLineViz>
          <div className="center stack form">
            <div>
              <button onClick={() => setSeed(Math.floor(Math.random() * 100))}>
                New Seed
              </button>
              <span className="highlight">Seed: {seed}</span>
            </div>
            <div>
              <span>Smoothness</span>
              <input
                type="range"
                min="1"
                max="1000"
                step="1"
                value={smoothness}
                onChange={(e) => setSmoothness(parseInt(e.target.value))}
              />
            </div>
            <div>
              <span>Turbulence</span>
              <input
                type="range"
                min="0"
                max="6"
                step="0.2"
                value={turbulance}
                onChange={(e) => setTurbulance(parseFloat(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
