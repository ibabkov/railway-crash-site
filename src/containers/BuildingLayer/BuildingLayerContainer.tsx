import React from 'react';

import { useMapLoad } from '../../hooks/useMapLoad';
import { getBuildingLayerPrintOptions, getLabelLayerId } from './helpers';
import { MIN_BUILDING_LAYER_ZOOM } from './constants';

export const BuildingLayerContainer: React.FC = () => {
	useMapLoad(map => {
		map.addLayer(
			{
				id: '3d-buildings',
				source: 'composite',
				'source-layer': 'building',
				filter: ['==', 'extrude', 'true'],
				type: 'fill-extrusion',
				minzoom: MIN_BUILDING_LAYER_ZOOM,
				paint: getBuildingLayerPrintOptions(),
			},
			getLabelLayerId(map),
		);
	});

	return null;
};
