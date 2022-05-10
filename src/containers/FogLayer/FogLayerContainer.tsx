import React from 'react';

import { useMapLoad } from '../../hooks/useMapLoad';

export const FogLayerContainer: React.FC = () => {
  useMapLoad((map) => {
    map.on('load', () => {
      map.setFog({
        range: [1, 10],
        color: '#707386',
        'horizon-blend': 0.4,
      });
    });
  });

  return null;
};
