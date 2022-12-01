import React from 'react';
import { Typography } from '@mui/material';

const TitleRender = (props) => {
  const { title } = props;
  return (
    <Typography
      component='div'
      variant='h4'
    >
      {title}
    </Typography>
  );
};

export default TitleRender;
