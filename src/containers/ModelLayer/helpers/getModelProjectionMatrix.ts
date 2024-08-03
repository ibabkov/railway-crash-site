import { MercatorCoordinate } from 'mapbox-gl';
import { Matrix4, Vector3 } from 'three';

import { MODEL_ALTITUDE, MODEL_POSITION, MODEL_ROTATION } from '../../../constants/model';

const MODEL_COORDINATES = MercatorCoordinate.fromLngLat(MODEL_POSITION, MODEL_ALTITUDE);
const MODEL_TRANSFORM = {
	translateX: MODEL_COORDINATES.x,
	translateY: MODEL_COORDINATES.y,
	translateZ: MODEL_COORDINATES.z as number,
	rotateX: MODEL_ROTATION[0],
	rotateY: MODEL_ROTATION[1],
	rotateZ: MODEL_ROTATION[2],
	scale: MODEL_COORDINATES.meterInMercatorCoordinateUnits(),
};

const MODEL_ROTATION_MAT_X = new Matrix4().makeRotationAxis(new Vector3(1, 0, 0), MODEL_TRANSFORM.rotateX);

const MODEL_ROTATION_MAT_Y = new Matrix4().makeRotationAxis(new Vector3(0, 1, 0), MODEL_TRANSFORM.rotateY);

const MODEL_ROTATION_MAT_Z = new Matrix4().makeRotationAxis(new Vector3(0, 0, 1), MODEL_TRANSFORM.rotateZ);

export function getModelProjectionMatrix(m: number[]) {
	const matrix = new Matrix4().fromArray(m);
	const scaleVector = new Vector3(MODEL_TRANSFORM.scale, -MODEL_TRANSFORM.scale, MODEL_TRANSFORM.scale);
	const projectionMatrix = new Matrix4()
		.makeTranslation(MODEL_TRANSFORM.translateX, MODEL_TRANSFORM.translateY, MODEL_TRANSFORM.translateZ)
		.scale(scaleVector)
		.multiply(MODEL_ROTATION_MAT_X)
		.multiply(MODEL_ROTATION_MAT_Y)
		.multiply(MODEL_ROTATION_MAT_Z);

	return matrix.multiply(projectionMatrix);
}
