import React from 'react';

export interface TitleRenderProps {
  title?: React.ReactNode,
  onClose?: () => void,
}

declare const TitleRender: React.FunctionComponent<TitleRenderProps>;

export default TitleRender;
