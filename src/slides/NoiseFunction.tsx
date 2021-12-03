import { useState } from 'react';
import { CodePane, Slide } from 'spectacle';
import { NoiseNumberViz } from '../viz/NoiseNumberViz';
import './slides.css';

export function NoiseFunction() {
  const [seed, setSeed] = useState(0);

  return (
    <Slide backgroundColor="#fff">
      <div className="center stack">
        <h3>Noise Functions</h3>
        <div className="center column">
          <div className="stack">
            <CodePane language="typescript" showLineNumbers={false}>
              {`
            const seed = random();
            const n = noise(x, y, seed)
            `}
            </CodePane>
          </div>
          <div className="center stack">
            <NoiseNumberViz seed={seed}></NoiseNumberViz>
            <div className="center stack form">
              <div>
                <button
                  onClick={() => setSeed(Math.floor(Math.random() * 100))}
                >
                  New Seed
                </button>
                <span className="highlight">Seed: {seed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
}
