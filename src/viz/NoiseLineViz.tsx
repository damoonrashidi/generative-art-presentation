import { useRef, useEffect } from 'react';
import * as lib from '../lib';
import './viz.css';

interface Prop {
  seed: number;
  smoothness: number;
  turbulence: number;
}

export function NoiseLineViz(props: Prop) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const [width, height] = [1600, 1600];

    const context = canvas.current.getContext('2d')!;

    context.fillStyle = '#eee';
    context.fillRect(0, 0, width, height);

    context.strokeStyle = '#000';
    context.lineWidth = 8;
    context.lineCap = 'round';

    for (let x = 100; x < width - 100; x += width / 20) {
      for (let y = 100; y < height - 100; y += height / 20) {
        const n = lib.Noise.simplex(
          x / props.smoothness,
          y / props.smoothness,
          props.seed
        );

        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.stroke();

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(
          x + Math.cos(n * props.turbulence) * 50,
          y + Math.sin(n * props.turbulence) * 50
        );
        context.stroke();
      }
    }
  });

  return <canvas ref={canvas} width="1600px" height="1600px"></canvas>;
}
