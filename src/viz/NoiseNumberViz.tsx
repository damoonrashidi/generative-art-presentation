import { useRef, useEffect } from 'react';
import * as lib from '../lib';
import './viz.css';

export function NoiseNumberViz(props: { seed: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const [width, height] = [800, 800];

    const context = canvas.current.getContext('2d')!;

    context.fillStyle = '#eee';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#000';
    context.font = '700 30px Source Code Pro';

    for (let x = 0; x < width - 100; x += width / 8) {
      for (let y = 0; y < height - 100; y += height / 8) {
        const n = lib.Noise.simplex(x / 800, y / 800, props.seed);

        const rounded = Math.floor(n * 100) / 100;

        const leftPadded = `${rounded}`.padStart(2, ' ');

        context.fillText(`${leftPadded}`, x + 50, y + 100);
      }
    }
  });

  return <canvas ref={canvas} width="800px" height="800px"></canvas>;
}
