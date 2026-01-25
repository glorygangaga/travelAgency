import { About } from './About';
import { Contacts } from './Contacts';
import { Reviews } from './Reviews';
import { TopTours } from './TopTours';

export function HomePage() {
  return (
    <>
      <TopTours />
      <About />
      <Reviews />
      <Contacts />
    </>
  );
}
