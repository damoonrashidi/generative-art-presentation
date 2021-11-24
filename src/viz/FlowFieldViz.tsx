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
}

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

    context.strokeStyle = '#000';
    context.lineWidth = props.lineWidth;
    context.lineCap = 'round';

    for (let i = 0; i < props.lineCount; i++) {
      let x = lib.randomFloat(0, width);
      let y = lib.randomFloat(0, height);
      context.strokeStyle = lib.hsla(
        lib.randomHue([0, 100], 100, lib.randomInt(30, 40))
      );

      if (props.lineCount === 1) {
        x = width / 2;
        y = height / 2;
      }

      context.beginPath();
      context.moveTo(x, y);
      while (lib.isInsideRectangle([x, y], [0, 0, width, height])) {
        const n = lib.Noise.simplex(
          x / props.smoothness,
          y / props.smoothness,
          props.seed
        );

        x += Math.sin(n * props.turbulence) * props.stepSize;
        y += Math.cos(n * props.turbulence) * props.stepSize;
        context.lineTo(x, y);
      }
      context.stroke();
    }
  });

  return <canvas ref={canvas} width="800px" height="800px"></canvas>;
}
