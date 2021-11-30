import { Slide, CodePane } from 'spectacle';

export function WhatIsGenerativeArt() {
  return (
    <Slide backgroundColor="#fff">
      <div className="center stack">
        <h2>What is generative art</h2>
        <div className="center column">
          <CodePane language="typescript" showLineNumbers={false}>
            {`
          const x = randomInt(0, canvas.width);
          const y = randomInt(0, canvas.height);

          canvas.fillRect(x, y, 100, 100);
          `}
          </CodePane>
          <h2>
            <span className="highlight">=</span> ART.
          </h2>
        </div>
      </div>
    </Slide>
  );
}
