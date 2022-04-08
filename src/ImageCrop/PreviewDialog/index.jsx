/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-02 14:43:30
 * @LastEditTime: 2022-04-02 15:43:40
 */
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { IconLogout } from '@tabler/icons';

import { dialogPropTypes } from '../common';

const PreviewDialog = (props) => {
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
        <Button variant='outlined' onClick={onClose}>
          <IconLogout />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PreviewDialog.propTypes = {
  src: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  filename: PropTypes.string,
  ...dialogPropTypes,
};

export default PreviewDialog;
