import { useRef, useEffect } from 'react';
import * as lib from '../lib';
import './viz.css';

export interface Colors {
  background: lib.HSLA;
  palette: lib.HSLA[];
}

interface Prop {
  colors: Colors;
  seed: number;
}

export function ForcesColorViz(props: Prop) {
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

    context.fillStyle = lib.hsla(props.colors.background);
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < 1200; i++) {
      let x = lib.randomFloat(0, width);
      let y = lib.randomFloat(0, height);

      const line: lib.Circle[] = [];

      const r = 5;

      context.fillStyle = lib.hsla(lib.fromPalette(props.colors.palette));

      while (
        lib.isInsideRectangle([x, y], [100, 100, width - 100, height - 100]) &&
        lib.randomFloat() > 0.01
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

        if (lib.isInsideAnyParticle(particle, quad, 10)) {
          break;
        }

        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI);
        context.fill();
        line.push(particle);

        x += Math.cos(n * turbulence) * 8 * Math.sqrt(r);
        y += Math.sin(n * turbulence) * 8 * Math.sqrt(r);
      }

      for (let cirlce of line) {
        const index = lib.getQuadrantIndex([x, y], width, height, quadCount);
        quads[index]?.push(cirlce);
      }
    }
  });

  return <canvas ref={canvas} width="1600px" height="1600px"></canvas>;
}