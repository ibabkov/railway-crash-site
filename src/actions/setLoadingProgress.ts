import { StoreState } from '../types/store';

export type SetLoadingProgressOptions = {
	progress: number;
};

export const setLoadingProgress = (set: (fn: (state: StoreState) => void) => void) => (options: SetLoadingProgressOptions) => {
	const { progress } = options;

	set((state: StoreState) => {
		state.loadingProgress = progress;
	});
};
