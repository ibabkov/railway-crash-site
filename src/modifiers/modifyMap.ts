import type { Map } from 'mapbox-gl';

import { TApplicationStateModifier } from '../types/applicationContext';

export const modifyMap =
  (map: Map): TApplicationStateModifier =>
  () => ({ map });
