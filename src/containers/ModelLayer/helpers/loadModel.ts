import { BufferGeometry } from 'three';
import { PLYLoader } from 'three-stdlib';

import { MODEL_URL } from '../../../constants/model';

export function loadModel(onProgress: (progress: number) => void, onLoad: (gltf: BufferGeometry) => void) {
	const loader = new PLYLoader();

	loader.load(
		MODEL_URL,
		geometry => {
			onProgress(1);
			onLoad(geometry);
		},
		({ loaded, total }) => {
			if (!total) return;

			const progress = Math.min((loaded / total) * 0.99, 0.99);
			onProgress(progress);
		},
	);
}
