import { Slide, UnorderedList, ListItem } from 'spectacle';

export function Frameworks() {
  return (
    <Slide backgroundColor="#fff">
      <h2>Frameworks</h2>
      <UnorderedList>
        <ListItem>Processing</ListItem>
        <ListItem>P5.js</ListItem>
        <ListItem>TouchDesigner</ListItem>
        <ListItem className="highlight">
          &gt; Typescript &amp; Canvas API
        </ListItem>
      </UnorderedList>
    </Slide>
  );
}
