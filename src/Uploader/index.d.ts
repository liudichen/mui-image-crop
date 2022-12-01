import React from 'react';

import { UploaderProps as UploaderCommonProps } from '../types';

export interface UploaderProps extends UploaderCommonProps {
  accept?: string | string [],
  disabled?: boolean,
  onDropAccepted?: (files: File[], e: Event) => void,
}

declare const Uploader: React.FC<React.PropsWithChildren<UploaderProps>>;

export default Uploader;
