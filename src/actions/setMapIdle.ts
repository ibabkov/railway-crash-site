import { StoreState } from '../types/store';

export type SetMapIdleOptions = {
	idle: boolean;
};

export const setMapIdle = (set: (fn: (state: StoreState) => void) => void) => (options: SetMapIdleOptions) => {
	const { idle } = options;

	set((state: StoreState) => {
		state.mapIdle = idle;
	});
};
