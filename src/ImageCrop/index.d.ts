/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 22:01:53
 * @LastEditTime: 2022-04-15 22:33:04
 */
import React from 'react';
import { CropperProps } from 'react-easy-crop';
import { DialogProps } from '@mui/material';

import { ImageCardProps, UploaderProps, ValueType, mark } from '../types';
import TitleRender from './CropDialog/TitleRender';
import ToolbarRender from './CropDialog/ToolbarRender';
import ActionsRender from './CropDialog/ActionsRender';

interface cropActionsProps {
  resetText?: React.ReactNode,
  okText?: React.ReactNode,
  cancelText?: React.ReactNode,
}

export interface ImageCropProps extends CropperProps {
  value?: ValueType,
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
  cropActionsProps?: cropActionsProps,
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
  okText?: React.ReactNode,
  resetText?: React.ReactNode,
  cancelText?: React.ReactNode,
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

declare const ImageCrop: React.FC<ImageCropProps>;

export default ImageCrop;

export {
  ActionsRenderProps,
} from './CropDialog/ActionsRender';

export {
  TitleRenderProps,
} from './CropDialog/TitleRender';

export {
  ToolbarRenderProps,
} from './CropDialog/ToolbarRender';
