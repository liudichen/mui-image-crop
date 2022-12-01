import React from 'react';
import { DropzoneOptions } from 'react-dropzone';

export interface ValueType {
  size?: number,
  url?: string,
  name?: string,
  type?: string,
  originFile?: File,
  lastModified?: any,
  lastModifiedDate?: any,
  width?: number,
  height?: number,
}

export interface ImageCardProps {
  style?: React.CSSProperties,
  className?: string,
  showDownloadIcon?: boolean,
  showPreviewIcon?: boolean,
  showRemoveIcon?: boolean,
  customDownloadIcon?: React.ReactNode,
  customPreviewIcon?: React.ReactNode,
  customRemoveIcon?: React.ReactNode,
  onDownload?: () => void,
  onPreview?: () => void,
  onRemove?: () => void,
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

export interface mark {
  value: number,
  label: React.ReactNode,
}
