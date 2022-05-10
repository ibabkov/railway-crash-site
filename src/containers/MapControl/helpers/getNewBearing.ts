import type { Map } from 'mapbox-gl';

import { ROTATE_SCALE } from '../constants';

export const getNewBearing = (map: Map, x: number, lastX: number) => {
  const bearing = map.getBearing();
  const { offsetWidth: containerWidth } = map.getContainer();
  const deltaX = lastX ? x - lastX : 0;
  const delta = ((deltaX / containerWidth) * 360) % 360;

  return bearing + delta * ROTATE_SCALE;
};
