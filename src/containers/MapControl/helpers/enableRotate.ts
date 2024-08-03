import type { Map } from 'mapbox-gl';

export const enableRotate = (map: Map) => {
	map.dragRotate.enable();
	map.touchZoomRotate.enable({ around: 'center' });
};
