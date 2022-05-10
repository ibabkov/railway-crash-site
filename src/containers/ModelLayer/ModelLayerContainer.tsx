import type { Map } from 'mapbox-gl';
import type { GLTF } from 'three-stdlib';
import { Camera, Scene, WebGLRenderer } from 'three';

import { useMapLoad } from '../../hooks/useMapLoad';
import {
  getModelProjectionMatrix,
  getThreeRenderer,
  loadModel,
} from './helpers';

export interface IModelLayerContainerProps {
  onLoad: () => void;
}

export const ModelLayerContainer = (props: IModelLayerContainerProps) => {
  const { onLoad } = props;
  useMapLoad((map) => {
    let renderer: WebGLRenderer | null = null;
    const camera = new Camera();
    const scene = new Scene();

    map.addLayer(
      {
        id: '3d-model',
        type: 'custom',
        renderingMode: '3d',
        onAdd: handleAddLayer,
        render: handleRenderLayer,
      },
      'waterway-label'
    );

    function handleLoadModel(gltf: GLTF) {
      scene.add(gltf.scene);
      onLoad();
    }

    function handleAddLayer(map: Map, gl: WebGLRenderingContext) {
      loadModel(handleLoadModel);
      renderer = getThreeRenderer(map, gl);
    }

    function handleRenderLayer(gl: WebGLRenderingContext, matrix: number[]) {
      if (!renderer) return;

      camera.projectionMatrix = getModelProjectionMatrix(matrix);
      renderer.resetState();
      renderer.render(scene, camera);
      map.triggerRepaint();
    }
  });

  return null;
};
