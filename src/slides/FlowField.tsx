import { useState } from 'react';
import { CodePane, Slide } from 'spectacle';
import { FlowFieldViz } from '../viz/FlowFieldViz';
import './slides.css';

export function FlowField() {
  const [seed, setSeed] = useState(0);
  const [smoothness, setSmoothness] = useState(1);
  const [turbulance, setTurbulance] = useState(1);
  const [lineCount, setLineCount] = useState(1);
  const [stepSize, setStepSize] = useState(10);
  const [lineWidth, setLineWidth] = useState(1);

  return (
    <Slide backgroundColor="#fff">
      <div className="center column mid">
        <CodePane
          language="typescript"
          showLineNumbers={true}
          highlightRanges={[2, [3, 4], 8, [15, 17]]}
        >
          {`

            context.lineWidth = ${lineWidth};
            for (let i = 0; i < ${lineCount}; i++) {
              let x = randomFloat(0, width);
              let y = randomFloat(0, height);
              
              context.beginPath();
              context.moveTo(x, y);
              while (isInBounds(x, y)) {
                const n = Noise.simplex(
                  x / ${smoothness},
                  y / ${smoothness},
                  ${seed}
                );
        
                x += Math.cos(n * ${turbulance}) * ${stepSize};
                y += Math.sin(n * ${turbulance}) * ${stepSize};
                context.lineTo(x, y);
              }
              context.stroke();
            }
            `}
        </CodePane>
        <div className="center stack">
          <FlowFieldViz
            seed={seed}
            smoothness={smoothness}
            turbulence={turbulance}
            lineCount={lineCount}
            stepSize={stepSize}
            lineWidth={lineWidth}
          />
          <div className="center stack">
            <span className="highlight big">Seed: {seed}</span>
            <button onClick={() => setSeed(Math.floor(Math.random() * 100))}>
              New Seed
            </button>
            <div>
              Smoothness:
              <input
                type="range"
                min="0"
                max="800"
                step="10"
                value={smoothness}
                onChange={(e) => setSmoothness(parseInt(e.target.value))}
              />
            </div>
            <div>
              Turbulence:
              <input
                type="range"
                min="0"
                max="6"
                step="0.2"
                value={turbulance}
                onChange={(e) => setTurbulance(parseFloat(e.target.value))}
              />
            </div>
            <div>
              Lines:
              <input
                type="range"
                min="1"
                max="1000"
                step="10"
                value={lineCount}
                onChange={(e) => setLineCount(parseInt(e.target.value))}
              />
            </div>
            <div>
              Line width:
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
              />
            </div>
            <div>
              Step size:
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={stepSize}
                onChange={(e) => setStepSize(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
