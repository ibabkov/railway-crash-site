import React from 'react';

import { Map, MapboxOptions } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { BuildingLayerContainer } from '../BuildingLayer';
import { FogLayerContainer } from '../FogLayer';
import { ModelLayerContainer } from '../ModelLayer';
import { MapControlContainer } from '../MapControl';
import {
	INITIAL_MAP_PITCH,
	MAP_CENTER,
	MAP_STYLE,
	MAPBOX_ACCESS_TOKEN,
	MAX_MAP_ZOOM,
	MAP_BEARING,
	MIN_MAP_ZOOM,
} from '../../constants/map';
import { MapLayout } from '../../components/MapLayout';
import { useStore } from '../../hooks/useStore';

export const ApplicationContainer: React.FC = () => {
	const { actions, loadingProgress, mapIdle } = useStore();
	const mapContainerRef = React.useRef<HTMLDivElement>(null);
	const idle = mapIdle && [-1, 1].includes(loadingProgress);

	React.useEffect(() => {
		if (mapContainerRef.current?.innerHTML) return;
		actions.setMap({ map: new Map(getMapOptions(mapContainerRef.current!)) });
	}, []);

	const handleIdle = React.useCallback(() => {
		actions.setMapIdle({ idle: true });
	}, [actions]);

	return (
		<MapLayout containerRef={mapContainerRef} loadingProgress={loadingProgress} idle={idle}>
			<BuildingLayerContainer />
			<FogLayerContainer />
			<ModelLayerContainer />
			<MapControlContainer onIdle={handleIdle} />
		</MapLayout>
	);
};

function getMapOptions(mapContainer: HTMLDivElement): MapboxOptions {
	return {
		zoom: MIN_MAP_ZOOM,
		minZoom: MIN_MAP_ZOOM,
		maxZoom: MAX_MAP_ZOOM,
		bearing: MAP_BEARING,
		pitch: 0,
		minPitch: 0,
		maxPitch: INITIAL_MAP_PITCH,
		container: mapContainer,
		accessToken: MAPBOX_ACCESS_TOKEN,
		style: MAP_STYLE,
		center: MAP_CENTER,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		minTileCacheSize: 1000,
		antialias: true,
		dragPan: false,
		dragRotate: false,
		pitchWithRotate: false,
		touchPitch: false,
		touchZoomRotate: true,
		interactive: true,
	};
}
