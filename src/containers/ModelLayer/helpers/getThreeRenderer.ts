import type { Map } from 'mapbox-gl';
import { WebGLRenderer } from 'three';

export function getThreeRenderer(map: Map, gl: WebGLRenderingContext) {
  const renderer = new WebGLRenderer({
    canvas: map.getCanvas(),
    context: gl,
    antialias: true,
  });
  renderer.autoClear = false;

  return renderer;
}
