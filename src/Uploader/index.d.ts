/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 21:46:55
 * @LastEditTime: 2022-04-15 23:32:54
 */
import React from 'react';
import { UploaderProps as UploaderCommonProps } from '../types';

export interface UploaderProps extends UploaderCommonProps {
  accept?: string | string [],
  disabled?: boolean,
  onDropAccepted?: (files: File[], e: Event) => void,
}

declare const Uploader: React.FunctionComponent<UploaderProps>;

export default Uploader;
