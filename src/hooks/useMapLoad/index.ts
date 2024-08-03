import React from 'react';

import type { Map } from 'mapbox-gl';

import { useApplicationState } from '../applicationContext';

export const useMapLoad = (listener: (map: Map) => void) => {
	const [{ map }] = useApplicationState();

	React.useEffect(() => {
		if (!map) return;

		map.on('load', () => listener(map));
	}, [map, listener]);
};
