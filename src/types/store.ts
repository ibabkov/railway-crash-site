import type { setMap, setLoadingProgress, setMapIdle } from '../actions';

export type StoreState = {
	map: any | null;
	mapIdle: boolean;
	loadingProgress: number;
	actions: {
		setMap: ReturnType<typeof setMap>;
		setLoadingProgress: ReturnType<typeof setLoadingProgress>;
		setMapIdle: ReturnType<typeof setMapIdle>;
	};
};
