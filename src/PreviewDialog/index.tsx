import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { DialogProps } from '@mui/material';
import { IconLogout } from '@tabler/icons';

export interface PreviewDialogProps extends Omit<DialogProps, 'onClose'> {
  src?: string,
  filename?: string,
  onClose?: () => void | Promise<void>,
}

export const PreviewDialog = (props: PreviewDialogProps) => {
  const { src, open, onClose, filename, ...restProps } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      {...restProps}
    >
      <DialogTitle>
        {filename || 'Image Preview'}
      </DialogTitle>
      <DialogContent
        sx={{
          width: '100%',
          height: '100%',
          position: 'static',
          objectFit: 'contain',
        }}
      >
        <img
          src={src}
          alt={filename}
          style={{
            width: '100%',
            height: '100%',
            position: 'static',
            objectFit: 'contain',
            maxWidth: '100%',
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={onClose}
        >
          <IconLogout />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
