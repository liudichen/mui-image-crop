/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-15 21:55:19
 * @LastEditTime: 2022-04-15 21:57:02
 */
import React from 'react';
import { DialogProps } from '@mui/material';

export interface PreviewDialogProps extends DialogProps {
  src?: string,
  filename?: string,
}

declare const PreviewDialog: React.FC<PreviewDialogProps>;

export default PreviewDialog;
