import { Slide, CodePane } from 'spectacle';

export function WhatIsGenerativeArt() {
  return (
    <Slide backgroundColor="#fff">
      <div className="center stack">
        <h2>What is generative art</h2>
        <div className="center column">
          <CodePane language="typescript" showLineNumbers={false}>
            {`
          const x = Math.random() * Math.PI % canvas.width
          const y = Math.atan2(x) * HALF_PI % canvas.height

          canvas.fillRect(x, y, 100, 100);
          `}
          </CodePane>
          <h2>
            <span className="highlight">&gt;</span> ART.
          </h2>
        </div>
      </div>
    </Slide>
  );
}
