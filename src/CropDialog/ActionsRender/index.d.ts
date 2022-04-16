/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 21:07:40
 * @LastEditTime: 2022-04-16 19:22:18
 */
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

declare const ActionsRender: React.FunctionComponent<ActionsRenderProps>;

export default ActionsRender;
