import { useRef, useEffect } from 'react';
import * as lib from '../lib';
import './viz.css';

interface Prop {
  seed: number;
  lineCount: number;
  stepSize: number;
  enableCollisionDetection: boolean;
}

const positions = Array(2000)
  .fill(false)
  .map(() => [lib.randomFloat(0, 1200), lib.randomFloat(0, 1200)]);

export function ForcesViz(props: Prop) {
  const canvas = useRef<HTMLCanvasElement>(null);

  const smoothness = 1000;
  const turbulence = 4;
  const quadCount = 100;

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const [width, height] = [1200, 1200];

    const context = canvas.current.getContext('2d')!;
    const quads = lib.buildQuadMap(quadCount);
    const r = 5;

    context.fillStyle = '#eee';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#000';

    for (let i = 0; i < props.lineCount; i++) {
      let [x, y] = positions[i];

      if (i === 0) {
        x = width / 2;
        y = height / 2;
      }

      const line: lib.Circle[] = [];

      while (
        lib.isInsideRectangle([x, y], [100, 100, width - 100, height - 100]) &&
        (lib.randomFloat() > 0.01 || props.lineCount === 1)
      ) {
        const n = lib.Noise.simplex(x / smoothness, y / smoothness, props.seed);

        const particle: lib.Circle = {
          centerX: x,
          centerY: y,
          radius: r,
        };

        const quadIndex = lib.getQuadrantIndex(
          [particle.centerX, particle.centerY],
          width,
          height,
          quadCount
        );

        const quad = quads[quadIndex];

        if (
          props.enableCollisionDetection &&
          lib.isInsideAnyParticle(particle, quad, 10)
        ) {
          break;
        }

        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI);
        context.fill();
        line.push(particle);

        x += Math.cos(n * turbulence) * props.stepSize * Math.sqrt(r);
        y += Math.sin(n * turbulence) * props.stepSize * Math.sqrt(r);
      }

      for (let cirlce of line) {
        const index = lib.getQuadrantIndex([x, y], width, height, quadCount);
        quads[index]?.push(cirlce);
      }
    }
  });

  return <canvas ref={canvas} width="1200px" height="1200px"></canvas>;
}
