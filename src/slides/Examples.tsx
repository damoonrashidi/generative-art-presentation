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
            [
              'https://i.imgur.com/Ez1UEWU.jpg',
              'https://i.imgur.com/uLuvtCy.jpg',
            ],
            [
              'https://i.imgur.com/sBLFCgt.png',
              'https://i.imgur.com/AmbyOEk.jpg',
            ],
            [
              'https://i.imgur.com/c65xCfB.jpg',
              'https://i.imgur.com/LffdeTN.jpg',
            ],
            [
              'https://i.imgur.com/12YLldt.jpg',
              'https://i.imgur.com/Gm395iL.png',
            ],
          ]}
        >
          {(images: any) => (
            <div className="center column">
              {images?.map((img: string) => (
                <img src={img} height="600" alt="" />
              ))}
            </div>
          )}
        </Stepper>
      </div>
    </Slide>
  );
}
