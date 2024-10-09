import { BufferGeometry } from 'three';
import { PLYLoader } from 'three-stdlib';

import { MODEL_URL } from '../../../constants/model';

export function loadModel(onProgress: (progress: number) => void, onLoad: (gltf: BufferGeometry) => void) {
	const loader = new PLYLoader();

	loader.load(MODEL_URL, onLoad, ({ loaded, total }) => {
		onProgress(loaded / total);
	});
}
