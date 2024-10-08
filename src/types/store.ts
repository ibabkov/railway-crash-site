import type { setMap } from '../actions';

export type StoreState = {
	map: any | null;
	actions: {
		setMap: ReturnType<typeof setMap>;
	};
};
