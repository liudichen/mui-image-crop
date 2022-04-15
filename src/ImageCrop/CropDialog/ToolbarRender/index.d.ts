import React, { ReactNode } from 'react';

interface mark {
  value: number,
  label: number | string | ReactNode,
}

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
  onFinish: (value: any) => void;
}

declare const ToolbarRender: React.FC<ToolbarRenderProps>;

export default ToolbarRender;
