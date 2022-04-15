/* eslint-disable @typescript-eslint/ban-types */
/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 21:12:59
 * @LastEditTime: 2022-04-15 22:17:51
 */
import React from 'react';

export interface ValueType {
  size?: number,
  url?: string,
  nmae?: string,
  type?: string,
  originFile?: File,
}

export type className = string | Function | (string | Function | object)[] | object;

export interface ImageCardProps {
  style?: object,
  className?: className,
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

export interface UploaderProps {
  style?: object,
  className?: className,
  minSize?: number,
  maxSize?: number,
  useFsAccessApi?: boolean,
}

export interface mark {
  value: number,
  label: number | string | React.ReactNode,
}
