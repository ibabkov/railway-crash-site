import { useMapLoad } from '../../hooks/useMapLoad';

export const FogLayerContainer = () => {
	useMapLoad(map => {
		map.setFog({
			range: [2, 10],
			color: '#707386',
			'horizon-blend': 0.2,
		});
	});

	return null;
};
