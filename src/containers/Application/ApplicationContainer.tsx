import React from 'react';

import { Map, MapboxOptions } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { BuildingLayerContainer } from '../BuildingLayer';
import { FogLayerContainer } from '../FogLayer';
import { ModelLayerContainer } from '../ModelLayer';
import { MapControlContainer } from '../MapControl';
import { useModifyApplicationState } from '../../hooks/applicationContext';
import { modifyMap } from '../../modifiers/modifyMap';
import {
  INITIAL_MAP_PITCH,
  MAP_CENTER,
  MAP_STYLE,
  MAPBOX_TOKEN,
  INITIAL_MAP_ZOOM,
  MAX_MAP_ZOOM,
  MAP_BEARING,
} from '../../constants/map';
import { MapLayout } from '../../components/MapLayout';

export const ApplicationContainer: React.FC = () => {
  const setMap = useModifyApplicationState(modifyMap);
  const mapContainerRef = React.useRef<HTMLDivElement>(null);
  const [load, setLoad] = React.useState(false);

  React.useEffect(() => {
    setMap(new Map(getMapOptions(mapContainerRef.current!)));
  }, []);

  const handleIdle = React.useCallback(() => {
    setLoad(true);
  }, [setLoad]);

  return (
    <MapLayout containerRef={mapContainerRef} load={load}>
      <BuildingLayerContainer />
      <FogLayerContainer />
      <ModelLayerContainer />
      <MapControlContainer onIdle={handleIdle} />
    </MapLayout>
  );
};

function getMapOptions(mapContainer: HTMLDivElement): MapboxOptions {
  const zoom = INITIAL_MAP_ZOOM - 4;

  return {
    zoom,
    minZoom: zoom,
    maxZoom: MAX_MAP_ZOOM,
    bearing: MAP_BEARING,
    pitch: 0,
    minPitch: 0,
    maxPitch: INITIAL_MAP_PITCH,
    container: mapContainer,
    accessToken: MAPBOX_TOKEN,
    style: MAP_STYLE,
    center: MAP_CENTER,
    antialias: true,
    dragPan: false,
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
    touchZoomRotate: true,
    interactive: true,
  };
}
