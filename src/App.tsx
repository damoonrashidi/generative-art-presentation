import { Deck } from 'spectacle';
import './App.css';
import * as slides from './slides';

function App() {
  const theme = {
    colors: {
      primary: '#111',
      secondary: '#111',
      background: '#fff',
    },
    background: '#fff',
    backgroundColor: '#fff',
    fontSizes: {
      header: '64px',
      paragraph: '28px',
    },
  };

  return (
    <div className="App">
      <Deck theme={theme} transition={undefined}>
        <slides.Hello />
        <slides.WhoAmI />
        <slides.WhatIsGenerativeArt />
        <slides.Frameworks />
        <slides.PutAPixelOnTheScreen />
        <slides.WhyGenerativeArt />
        <slides.Examples />
        <slides.PracticalExample />
        <slides.WhatWeWillBuild />
        <slides.NoiseFunction />
        <slides.NoiseLineFunction />
        <slides.FlowField />
        <slides.Forces />
      </Deck>
    </div>
  );
}

export default App;
