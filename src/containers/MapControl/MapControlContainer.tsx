import React from 'react';

import type { MapLayerMouseEvent, MapLayerTouchEvent } from 'mapbox-gl';
import debounce from 'lodash/debounce';

import { IDLE_CHECK_INTERVAL, INITIAL_CONTROL_STATE, ROTATE_OPTIONS, ZOOM_DEBOUNCE_DELAY, INITIAL_ANIMATION_DURATION } from './constants';
import { INITIAL_MAP_ZOOM, INITIAL_MAP_PITCH, MIN_MAP_ZOOM } from '../../constants/map';
import { getNewBearing, enableRotate, easeToCenter } from './helpers';
import { useMapLoad } from '../../hooks/useMapLoad';

export type MapControlContainerProps = {
	onIdle: () => void;
};

export const MapControlContainer = (props: MapControlContainerProps) => {
	const { onIdle } = props;
	const [state] = React.useState(() => ({ ...INITIAL_CONTROL_STATE }));

	useMapLoad(map => {
		const handleZoomDebounced = debounce(handleZoom, ZOOM_DEBOUNCE_DELAY);

		enableRotate(map);

		map.once('idle', handleIdle);
		map.on('mousemove', handleMove);
		map.on('touchmove', handleMove);
		map.on('zoom', handleZoomDebounced);
		map.on('touchstart', () => toggleRotate(true));
		map.on('mousedown', () => toggleRotate(true));
		map.on('mouseup', () => toggleRotate(false));
		map.on('touchend', () => toggleRotate(false));
		map.on('mouseleave', () => toggleRotate(false));
		map.on('mouseout', () => toggleRotate(false));

		function handleMove(e: MapLayerMouseEvent | MapLayerTouchEvent) {
			const { easing, rotating, lastX } = state;

			if (!easing && rotating) {
				const bearing = getNewBearing(map, e.point.x, lastX);
				map.rotateTo(bearing, ROTATE_OPTIONS);
				state.lastX = e.point.x;
			}
		}

		function handleZoom() {
			const interval = setInterval(() => {
				if (!state.rotating) {
					easeToCenter(map, state);
					clearInterval(interval);
				}
			}, IDLE_CHECK_INTERVAL);
		}

		function handleIdle() {
			map.jumpTo({ zoom: MIN_MAP_ZOOM, pitch: INITIAL_MAP_PITCH });
			map.easeTo({ duration: INITIAL_ANIMATION_DURATION, zoom: INITIAL_MAP_ZOOM, pitch: INITIAL_MAP_PITCH });
			map.setMinZoom(MIN_MAP_ZOOM);
			onIdle();
		}

		function toggleRotate(newRotating: boolean) {
			document.body.style.cursor = newRotating ? 'grabbing' : 'grab';
			state.lastX = INITIAL_CONTROL_STATE.lastX;
			state.rotating = newRotating;
		}
	});

	return null;
};
