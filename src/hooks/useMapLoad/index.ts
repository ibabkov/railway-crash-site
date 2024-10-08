import React from 'react';

import type { Map } from 'mapbox-gl';

import { useStore } from '../useStore';

export const useMapLoad = (listener: (map: Map) => void) => {
	const { map } = useStore();

	React.useEffect(() => {
		if (!map) return;

		map.on('load', () => listener(map));
	}, [map, listener]);
};
