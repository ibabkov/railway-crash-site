import { FrontSide } from 'three';

export const MODEL_POSITION: [number, number] = [-76.19037, 36.68375];
export const MODEL_ALTITUDE = -0.1;
export const MODEL_POINT_SIZE = 2.5;
export const MODEL_ROTATION = [0, 0, 1.74];
export const MODEL_URL = '/scene.ply';
export const MODEL_MATERIAL_OPTIONS = {
  vertexColors: true,
  side: FrontSide,
  transparent: false,
  sizeAttenuation: false,
  fog: false,
  size: MODEL_POINT_SIZE,
};
