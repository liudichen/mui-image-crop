/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 21:04:10
 * @LastEditTime: 2022-04-15 21:10:51
 */
import React from 'react';

export interface TitleRenderProps {
  title?: React.ReactNode,
  onClose?: () => void,
}

declare const TitleRender: React.FunctionComponent<TitleRenderProps>;

export default TitleRender;
