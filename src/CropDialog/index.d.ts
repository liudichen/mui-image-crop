import React from 'react';
import { CropperProps } from 'react-easy-crop';
import { DialogProps } from '@mui/material';

import { mark, ValueType } from '../types';
import TitleRender from './TitleRender';
import ToolbarRender from './ToolbarRender';
import ActionsRender, { ActionsRenderProps } from './ActionsRender';

interface imageInfo extends Omit<Omit<ValueType, 'width'>, 'height'> {

}

export interface CropDialogProps extends Omit<CropperProps, 'image'>, ActionsRenderProps {
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
  zoomLabel?: React.ReactNode,
  rotateLabel?: React.ReactNode,
  aspectLabel?: React.ReactNode,
  allowTouchRotate?: boolean,
  title?: React.ReactNode,
  TitleRender?: typeof TitleRender | React.ReactNode,
  ActionsRender?: typeof ActionsRender | React.ReactNode,
  ToolbarRender?: typeof ToolbarRender | React.ReactNode,
  dialogPrps?: DialogProps,
  cropperContainerStype?: React.CSSProperties,
  dialogContentRootStyle?: React.CSSProperties,
  open: boolean,
  onClose: () => void,
  onFinish: (value: ValueType) => void,
}

declare const CropDialog: React.FunctionComponent<CropDialogProps>;

export default CropDialog;
