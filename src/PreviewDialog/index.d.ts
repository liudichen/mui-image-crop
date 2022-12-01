import React from 'react';
import { DialogProps } from '@mui/material';

export interface PreviewDialogProps extends DialogProps {
  src?: string,
  filename?: string,
}

declare const PreviewDialog: React.FC<PreviewDialogProps>;

export default PreviewDialog;
