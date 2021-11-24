import { Slide, Stepper } from 'spectacle';
import './slides.css';

export function Examples() {
  return (
    <Slide backgroundColor="#fff">
      <div className="center">
        <Stepper
          tagName="a"
          alwaysVisible
          values={[
            'https://i.imgur.com/Ez1UEWU.jpg',
            'https://i.imgur.com/uLuvtCy.jpg',
            'https://i.imgur.com/AmbyOEk.jpg',
            'https://i.imgur.com/tLBq5l6.jpg',
            'https://i.imgur.com/c65xCfB.jpg',
            'https://i.imgur.com/LffdeTN.jpg',
            'https://i.imgur.com/12YLldt.jpg',
            'https://i.imgur.com/Gm395iL.png',
          ]}
        >
          {(value) => <img src={value as string} alt="" height="700px" />}
        </Stepper>
      </div>
    </Slide>
  );
}
