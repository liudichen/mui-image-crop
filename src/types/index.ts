import React from 'react';
import type { DropzoneOptions } from 'react-dropzone';

export type ICroppedImage = {
  name?: string,
  size?: number,
  url: string,
  type?: string,
  originFile?: File,
  lastModified?: any,
  lastModifiedDate?: any,
  width?: number,
  height?: number,
} | (File & {
  originFile?: File,
  url: string,
  width: number,
  height: number,
});

export interface ImageCardProps {
  style?: React.CSSProperties,
  className?: string,
  showDownloadIcon?: boolean,
  showPreviewIcon?: boolean,
  showRemoveIcon?: boolean,
  customDownloadIcon?: React.ReactNode,
  customPreviewIcon?: React.ReactNode,
  customRemoveIcon?: React.ReactNode,
  onDownload?: (value?: ICroppedImage) => void,
  onPreview?: () => void,
  onRemove?: (value?: ICroppedImage) => void,
  downloadText?: string,
  previewText?: string,
  removeText?: string,
}

export interface UploaderProps extends DropzoneOptions {
  style?: React.CSSProperties,
  className?: string,
  minSize?: number,
  maxSize?: number,
  /** 使用 File System Access API？ */
  useFsAccessApi?: boolean,
}

export interface IMarkItem {
  value: number,
  label: React.ReactNode,
}
