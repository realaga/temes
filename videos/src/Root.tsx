import {Composition} from 'remotion';
import {Bostezo, FPS, duracionEnFrames} from './Bostezo';

export const Root = () => (
  <Composition
    id="Bostezo"
    component={Bostezo}
    durationInFrames={duracionEnFrames}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
