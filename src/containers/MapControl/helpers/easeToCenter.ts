import type { Map } from 'mapbox-gl';

import { MAP_CENTER } from '../../../constants/map';
import { EASE_ANIMATION_DURATION } from '../constants';
import { MapControlContainerState } from '../types';

export const easeToCenter = (map: Map, state: MapControlContainerState) => {
	state.easing = true;

	map.easeTo({
		center: MAP_CENTER,
		duration: EASE_ANIMATION_DURATION,
	});

	setTimeout(() => (state.easing = false), EASE_ANIMATION_DURATION);
};
