/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 22:01:53
 * @LastEditTime: 2022-04-16 21:42:52
 */
import React from 'react';
import { CropperProps } from 'react-easy-crop';
import { DialogProps } from '@mui/material';

import { ImageCardProps, UploaderProps, ValueType, mark } from './types';
import TitleRender, { TitleRenderProps as cropTitleRenderProps } from './CropDialog/TitleRender';
import ToolbarRender, { ToolbarRenderProps as cropToolbarRenderProps } from './CropDialog/ToolbarRender';
import ActionsRender, { ActionsRenderProps as cropActionsRenderProps } from './CropDialog/ActionsRender';

export {
  cropTitleRenderProps,
  cropToolbarRenderProps,
  cropActionsRenderProps,
};

export interface ImageCropProps extends CropperProps {
  /**
   * @description controlled property, cropped imageInfo object, and its type is { name: string, type: string, size: number, originFile: File, width: number, height :number, url: string }
   * @description.zh-CN value 受控属性，为剪裁后的图片信息的对象， 类型为 { name: string, type: string, size: number, originFile: File, width: number, height :number, url: string }
   * @default null
   */
  value?: ValueType,


  /**
   * @description controlled property,trigged when value changes
   * @description.zh-CN 受控属性，value变化的回调
   * @param {value: { name: string, type: string, size: number, originFile: File, width: number, height :number, url: string }}
   * @return {void}
   */
  onChange?: (value: ValueType) => void,
  disabled?: boolean,
  filename?: string,
  error?: boolean,
  preview?: boolean,
  previewDialogProps?: DialogProps,
  imageCropDialogProps?: DialogProps,
  cropperContainerStyle?: object,
  imageCropDialogContentRootStyle?: object,
  accept?: string | string[],
  imageCardProps?: ImageCardProps,
  uploaderProps?: UploaderProps,

  qulity?: number,
  imageType?: string,
  title?: React.ReactNode,
  TitleRender?: typeof TitleRender | React.ReactNode,
  showAspectToolbar?: boolean,
  showRotateToolbar?: boolean,
  showZoomToolbar?: boolean,
  ToolbarRender?: typeof ToolbarRender | React.ReactNode,
  ActionsRender?: typeof ActionsRender | React.ReactNode,
  resetText?: React.ReactNode,
  okText?: React.ReactNode,
  cancelText?: React.ReactNode,
  originText?: React.ReactNode,
  showReset?: boolean,
  showOk?: boolean,
  showOk?: boolean,
  showOrigin?: boolean,
  zoomLabel?: React.ReactNode,
  rotateLabel?: React.ReactNode,
  aspectLabel?: React.ReactNode,
  allowTouchRotate?: boolean,
  defaultAspect?: number,
  onAspectChange?: (aspect: number) => void,
  aspectMarks?: mark[],
  zoomStep?: number,
  rotateStep?: number,
  onFinish?: (value: ValueType) => void,
}

declare const ImageCrop: React.FunctionComponent<ImageCropProps>;

export default ImageCrop;
