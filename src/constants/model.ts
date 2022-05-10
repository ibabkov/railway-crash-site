import { FrontSide } from 'three';

export const MODEL_POSITION: [number, number] = [-76.19037, 36.68375];
export const MODEL_ALTITUDE = -0.1;
export const MODEL_POINT_SIZE = 4;
export const MODEL_ROTATION = [0, 0, 1.74];
export const MODEL_URL = '/scene2.ply';
export const MODEL_MATERIAL_OPTIONS = {
  vertexColors: true,
  side: FrontSide,
  transparent: false,
  sizeAttenuation: true,
  fog: false,
  size: MODEL_POINT_SIZE,
};
