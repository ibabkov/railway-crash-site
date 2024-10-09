import type { Map } from 'mapbox-gl';
import { WebGLRenderer, LinearSRGBColorSpace, ColorManagement } from 'three';

export function getThreeRenderer(map: Map, gl: WebGLRenderingContext) {
	const renderer = new WebGLRenderer({
		logarithmicDepthBuffer: true,
		canvas: map.getCanvas(),
		context: gl,
		antialias: true,
	});
	renderer.autoClear = false;
	renderer.outputColorSpace = LinearSRGBColorSpace;

	ColorManagement.enabled = true;

	return renderer;
}
