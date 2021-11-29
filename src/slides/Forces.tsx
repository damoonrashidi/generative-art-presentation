import { useState } from 'react';
import { CodePane, Slide } from 'spectacle';
import { ForcesViz } from '../viz/ForcesViz';
import './slides.css';

export function Forces() {
  const [seed, setSeed] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const [stepSize, setStepSize] = useState(21);
  const [enableCollisionDetection, setEnableCollisionDetection] =
    useState(false);

  return (
    <Slide backgroundColor="#fff">
      <div className="center column mid">
        <CodePane
          language="typescript"
          showLineNumbers={false}
          highlightRanges={[4, 5, [6], [12, 15], 17, [7, 10]]}
        >
          {`
          const previouslyDrawnCircles: lib.Cirlce[] = [];
          for (let i = 0; i < ${lineCount}; i++) {
            // set up x and y coordinates
            const line: lib.Circle[] = [];
            while ( isInsideCanvas && !randomlyEndLine ) {
              const particle: lib.Circle = { x, y, radius };
              if (
                collisionDetection &&
                lib.collides(particle, previouslyDrawnLines)
              ) { break; }
              
              drawCircle();
              line.push(particle);
              x += Math.cos(n * 4.4) * ${stepSize} * Math.sqrt(r);
              y += Math.sin(n * 4.4) * ${stepSize} * Math.sqrt(r);
            }
            previouslyDrawnLines.push(...line);
          }
            `}
        </CodePane>
        <div className="center stack">
          <ForcesViz
            seed={seed}
            lineCount={lineCount}
            stepSize={stepSize}
            enableCollisionDetection={enableCollisionDetection}
          />
          <div className="center stack">
            <span className="highlight big">Seed: {seed}</span>
            <button onClick={() => setSeed(Math.floor(Math.random() * 100))}>
              New Seed
            </button>
            <div>
              Lines:
              <input
                type="range"
                min="1"
                max="2000"
                step="1"
                value={lineCount}
                onChange={(e) => setLineCount(parseInt(e.target.value))}
              />
            </div>
            <div>
              Step size:
              <input
                type="range"
                min="2"
                max="50"
                step="1"
                value={stepSize}
                onChange={(e) => setStepSize(parseInt(e.target.value))}
              />
            </div>

            <div>
              Collision detection:
              <input
                type="checkbox"
                checked={enableCollisionDetection}
                onChange={(e) => setEnableCollisionDetection(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
