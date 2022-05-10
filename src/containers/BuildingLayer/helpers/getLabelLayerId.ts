import type { AnyLayer, Map } from 'mapbox-gl';

export const getLabelLayerId = (map: Map) => {
  const layers = map.getStyle().layers;
  const labelLayer = layers.find(
    (layer: AnyLayer) => layer.type === 'symbol' && layer.layout!['text-field']
  )!;

  return labelLayer.id;
};
