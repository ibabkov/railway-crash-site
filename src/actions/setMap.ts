import { Map } from 'mapbox-gl';

import { StoreState } from '../types/store';

export type SetMapOptions = {
	map: Map;
};

export const setMap = (set: (fn: (state: StoreState) => void) => void) => (options: SetMapOptions) => {
	const { map } = options;

	set((state: StoreState) => {
		state.map = map;
	});
};
