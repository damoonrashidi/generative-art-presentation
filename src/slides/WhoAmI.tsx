import { Slide, ListItem, UnorderedList } from 'spectacle';

export function WhoAmI() {
  return (
    <Slide backgroundColor="#fff">
      <h2>Who am I?</h2>
      <UnorderedList>
        <ListItem className="highlight">Damoon Rashidi</ListItem>
        <ListItem>Lead Developer @ Freespee</ListItem>
        <ListItem>Generative Artist</ListItem>
        <ListItem>All around fun guy</ListItem>
      </UnorderedList>
    </Slide>
  );
}
