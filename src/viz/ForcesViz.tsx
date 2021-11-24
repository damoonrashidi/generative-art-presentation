import { useRef, useEffect } from 'react';
import * as lib from '../lib';
import './viz.css';

interface Prop {
  seed: number;
  lineCount: number;
  stepSize: number;
  allowRandomRadius: boolean;
  enableCollisionDetection: boolean;
}

export function ForcesViz(props: Prop) {
  const canvas = useRef<HTMLCanvasElement>(null);

  const smoothness = 1000;
  const turbulence = 4;
  const quadCount = 100;

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const [width, height] = [1600, 1600];

    const context = canvas.current.getContext('2d')!;

    const quads = lib.buildQuadMap(quadCount);

    context.fillStyle = '#eee';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#000';

    for (let i = 0; i < props.lineCount; i++) {
      let x = lib.randomFloat(0, width);
      let y = lib.randomFloat(0, height);

      if (props.lineCount === 1) {
        x = width / 2;
        y = height / 2;
      }

      const line: lib.Circle[] = [];

      const r = props.allowRandomRadius ? lib.randomFloat(4, 10) : 5;

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
          lib.isInsideAnyParticle(particle, quad, 20)
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

  return <canvas ref={canvas} width="1600px" height="1600px"></canvas>;
}
