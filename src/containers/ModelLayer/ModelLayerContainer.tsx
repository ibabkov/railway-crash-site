import type { Map } from 'mapbox-gl';
import { BufferGeometry, Camera, MathUtils, Points, PointsMaterial, Scene, WebGLRenderer } from 'three';
import debounce from 'lodash/debounce';

import { useMapLoad } from '../../hooks/useMapLoad';
import { getModelProjectionMatrix, getThreeRenderer, loadModel } from './helpers';
import { MODEL_MATERIAL_OPTIONS, MODEL_POINT_SIZE } from '../../constants/model';
import { useStore } from '../../hooks/useStore';

export const ModelLayerContainer = () => {
	const { actions } = useStore();

	useMapLoad(map => {
		let renderer: WebGLRenderer | null = null;
		let points: Points<BufferGeometry, PointsMaterial> | null = null;
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
			'waterway-label',
		);

		const handleZoom = debounce(() => {
			if (points) {
				const factor = (map.getZoom() - map.getMinZoom()) / (map.getMaxZoom() - map.getMinZoom());
				points.material.size = MathUtils.lerp(MODEL_POINT_SIZE - 1, MODEL_POINT_SIZE + 1, factor);
				points.material.needsUpdate = true;
			}
		}, 100);

		map.on('zoom', handleZoom);

		function handleModelLoading(progress: number) {
			actions.setLoadingProgress({ progress });
		}

		function handleModelLoaded(gltf: any) {
			const material = new PointsMaterial(MODEL_MATERIAL_OPTIONS);
			gltf.computeVertexNormals();

			material.vertexColors = true;
			material.sizeAttenuation = false;
			points = new Points(gltf, material);

			scene.add(points);
			map.triggerRepaint();
		}

		function handleAddLayer(map: Map, gl: WebGLRenderingContext) {
			loadModel(handleModelLoading, handleModelLoaded);
			renderer = getThreeRenderer(map, gl);
		}

		function handleRenderLayer(gl: WebGLRenderingContext, matrix: number[]) {
			if (!renderer) return;

			camera.projectionMatrix = getModelProjectionMatrix(matrix);
			renderer.resetState();
			renderer.render(scene, camera);
		}
	});

	return null;
};
