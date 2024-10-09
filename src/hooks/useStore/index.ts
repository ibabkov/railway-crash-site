import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { StoreState } from '../../types/store';
import { APP_TITLE } from '../../constants/app';
import * as actions from '../../actions';

export const useStore = create<StoreState>()(
	immer(
		devtools(
			set => {
				return {
					map: null,
					loadingProgress: 0,
					mapIdle: false,
					actions: {
						setMap: actions.setMap(set),
						setLoadingProgress: actions.setLoadingProgress(set),
						setMapIdle: actions.setMapIdle(set),
					},
				} as StoreState;
			},
			{
				name: `${APP_TITLE} state`,
			},
		),
	),
);
