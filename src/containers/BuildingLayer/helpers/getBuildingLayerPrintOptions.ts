import type { FillExtrusionPaint } from 'mapbox-gl';

import {
  BUILDING_LAYER_COLOR,
  BUILDING_LAYER_OPACITY,
} from '../../../constants/building';
import { MIN_BUILDING_LAYER_ZOOM } from '../constants';

export const getBuildingLayerPrintOptions = (): FillExtrusionPaint => {
  return {
    'fill-extrusion-color': BUILDING_LAYER_COLOR,
    'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      MIN_BUILDING_LAYER_ZOOM,
      0,
      MIN_BUILDING_LAYER_ZOOM + 0.05,
      ['get', 'height'],
    ],
    'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      MIN_BUILDING_LAYER_ZOOM,
      0,
      MIN_BUILDING_LAYER_ZOOM + 0.05,
      ['get', 'min_height'],
    ],
    'fill-extrusion-opacity': BUILDING_LAYER_OPACITY,
  };
};
