import { BufferGeometry } from 'three';
import { PLYLoader } from 'three-stdlib';

import { MODEL_URL } from '../../../constants/model';

export function loadModel(onLoad: (gltf: BufferGeometry) => void) {
  const loader = new PLYLoader();

  loader.load(MODEL_URL, onLoad);
}
