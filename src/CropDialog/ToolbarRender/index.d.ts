import React from 'react';

import { ValueType, mark } from '../../types';

export interface ToolbarRenderProps {
  zoom?: number,
  onZoomChange?: (zoom: number) => void,
  minZoom?: number,
  maxZoom?: number,
  zoomStep?: number,
  showZoomToolbar?: boolean,
  rotation?: number,
  onRotationChange?: (rotation: number) => void,
  rotateStep?: number,
  showRotateToolbar?: boolean,
  defaultAspect?: number,
  aspect?: number,
  onAspectChange?: (aspect: number) => void,
  showAspectToolbar?: boolean,
  aspectMarks?: mark[],
  onReset?: () => void,
  onClose?: () => void,
  width?: number | string,
  onFinish: (value: ValueType) => void;
}

declare const ToolbarRender: React.FunctionComponent<ToolbarRenderProps>;

export default ToolbarRender;
