import React from 'react';

import { ImageCardProps as ImageCardCommonProps } from '../types';

export interface ImageCardProps extends ImageCardCommonProps {
  src?: string,
  filename?: string,
}

declare const ImageCard: React.FunctionComponent<ImageCardProps>;

export default ImageCard;
