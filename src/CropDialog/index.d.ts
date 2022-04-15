/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 21:17:25
 * @LastEditTime: 2022-04-15 23:32:52
 */
import React from 'react';
import { CropperProps } from 'react-easy-crop';
import { DialogProps } from '@mui/material';

import { mark } from '../types';
import TitleRender from './TitleRender';
import ToolbarRender from './ToolbarRender';
import ActionsRender from './ActionsRender';

interface imageInfo {
  src?: string,
  name?: string,
  type?: string,
}

export interface CropDialogProps extends Omit<CropperProps, 'image'> {
  imageInfo?: imageInfo,
  qulity?: number,
  imageType?: string,
  showAspectToolbar?: boolean,
  onAspectChange?: (aspect: number) => void,
  defaultAspect?: number,
  aspectMarks?: mark[],
  showZoomToolbar?: boolean,
  zoomStep?: number,
  showRotateToolbar?: boolean,
  rotateStep?: number,
  allowTouchRotate?: boolean,
  TitleRender?: typeof TitleRender | React.ReactNode,
  ActionsRender?: typeof ActionsRender | React.ReactNode,
  ToolbarRender?: typeof ToolbarRender | React.ReactNode,
  dialogPrps?: DialogProps,
  cropperContainerStype?: object,
  dialogContentRootStyle?: object,
}

declare const CropDialog: React.FunctionComponent<CropDialogProps>;

export default CropDialog;
