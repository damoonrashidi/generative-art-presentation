import { useState } from 'react';
import { CodePane, Slide } from 'spectacle';
import { NoiseNumberViz } from '../viz/NoiseNumberViz';
import './slides.css';

export function NoiseFunction() {
  const [seed, setSeed] = useState(0);

  return (
    <Slide backgroundColor="#fff">
      <div className="center stack">
        <h1>Noise Functions</h1>
        <div className="center column">
          <div className="stack">
            <CodePane language="typescript" showLineNumbers={false}>
              {`
            const seed = random();
            const n = noise2d(x, y, seed)
            `}
            </CodePane>
            <div>
              <p>
                <span className="highlight">n</span> is a value between -1 and 1
              </p>
            </div>
          </div>
          <div className="center stack">
            <NoiseNumberViz seed={seed}></NoiseNumberViz>
            <div>
              <span className="highlight big">Seed: {seed}</span>
              <button onClick={() => setSeed(Math.floor(Math.random() * 100))}>
                New Seed
              </button>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
