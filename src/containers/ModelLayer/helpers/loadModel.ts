import { GLTF, GLTFLoader } from 'three-stdlib';

import { MODEL_URL } from '../../../constants/model';

export function loadModel(onLoad: (gltf: GLTF) => void) {
  const loader = new GLTFLoader();

  loader.load(MODEL_URL, onLoad);
}
