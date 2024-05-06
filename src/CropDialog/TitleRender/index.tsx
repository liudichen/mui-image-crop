import React from 'react';
import { Typography } from '@mui/material';

export interface TitleRenderProps {
  title?: React.ReactNode;
  onClose?: () => void | Promise<void>;
}

export const TitleRender = (props: TitleRenderProps) => {
  const { title } = props;
  return (
    <Typography component="div" variant="h4">
      {title}
    </Typography>
  );
};
