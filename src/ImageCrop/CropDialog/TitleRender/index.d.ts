/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 21:04:10
 * @LastEditTime: 2022-04-15 21:07:14
 */
import React from 'react';

interface TitleRenderProps {
  title?: React.ReactNode,
  onClose?: () => void,
}

declare const TitleRender: React.FC<TitleRenderProps>;

export default TitleRender;
