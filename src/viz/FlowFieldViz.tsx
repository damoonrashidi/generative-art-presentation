import { useRef, useEffect } from 'react';
import * as lib from '../lib';
import './viz.css';

interface Prop {
  seed: number;
  smoothness: number;
  turbulence: number;
  lineCount: number;
  stepSize: number;
  lineWidth: number;
  showAnchors: boolean;
}

const positions = Array(1000)
  .fill(false)
  .map(() => [lib.randomFloat(0, 800), lib.randomFloat(0, 800)]);

export function FlowFieldViz(props: Prop) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }

    const [width, height] = [800, 800];

    const context = canvas.current.getContext('2d')!;

    context.fillStyle = '#eee';
    context.fillRect(0, 0, width, height);

    context.lineWidth = props.lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = lib.hsla([0, 0, 0]);
    context.fillStyle = lib.hsla([0, 50, 50]);

    for (let i = 0; i < props.lineCount; i++) {
      let distance = 0;
      let [x, y] = positions[i];

      if (i === 0) {
        x = width / 2;
        y = height / 2;
      }

      context.beginPath();
      context.moveTo(x, y);
      while (
        lib.isInsideRectangle([x, y], [0, 0, width, height]) &&
        distance < 1000
      ) {
        const n = lib.Noise.simplex(
          x / props.smoothness,
          y / props.smoothness,
          props.seed
        );

        if (props.showAnchors) {
          context.fillRect(x - 10, y - 10, 20, 20);
        }

        x += Math.sin(n * props.turbulence) * props.stepSize;
        y += Math.cos(n * props.turbulence) * props.stepSize;

        distance += props.stepSize;
        context.lineTo(x, y);
      }
      context.stroke();
    }
  });

  return <canvas ref={canvas} width="800px" height="800px"></canvas>;
}
