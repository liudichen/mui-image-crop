/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 21:38:34
 * @LastEditTime: 2022-04-15 23:32:47
 */
import React from 'react';
import { ImageCardProps as ImageCardCommonProps } from '../types';

export interface ImageCardProps extends ImageCardCommonProps {
  src?: string,
  filename?: string,
}

declare const ImageCard: React.FunctionComponent<ImageCardProps>;

export default ImageCard;