import { ValueType } from '../types';

declare function createImage(url: string): Promise<string | Error>;

declare function getRadianAngle(degreeValue: number): number;

declare function rotateSize(width: number, height: number, rotation: number): { width:number, height:number };

declare function getOriginImage(imageInfo: ValueType): Promise<ValueType>;

declare function getCroppedImage(imageSrc: string, pixcelCrop: {x:number, y:number, width:number, height:number}, rotation?: number, type?: string, name?: string, qulity?: number, flip?: { horizontal?: boolean, vertical?: boolean}): Promise<ValueType>;

declare function fileToBase64(file: File): Promise<string>;

declare function generateFileDownload(fileBlob: File | Blob, fileName?: string): void;

export {
  createImage,
  getRadianAngle,
  rotateSize,
  getCroppedImage,
  getOriginImage,
  fileToBase64,
  generateFileDownload,
};
