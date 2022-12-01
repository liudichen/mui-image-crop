import React from 'react';

export interface ActionsRenderProps {
  onReset?: () => void,
  onClose?: () => void,
  onFinish?: () => void,
  onKeepOrigin?: () => void,
  resetText?: React.ReactNode,
  okText?: React.ReactNode,
  cancelText?: React.ReactNode,
  originText?: React.ReactNode,
  showReset?: boolean,
  showOk?: boolean,
  showOk?: boolean,
  showOrigin?: boolean,
}

declare const ActionsRender: React.FC<ActionsRenderProps>;

export default ActionsRender;
