/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 21:07:40
 * @LastEditTime: 2022-04-15 21:16:37
 */
import React from 'react';
import { ValueType } from '../../../types';

export interface ActionsRenderProps {
  onReset?: () => void,
  onClose?: () => void,
  onFinish?: (value: ValueType) => void,
  resetText?: React.ReactNode,
  okText?: React.ReactNode,
  cancel?: React.ReactNode,
}

declare const ActionsRender: React.FC<ActionsRenderProps>;

export default ActionsRender;
