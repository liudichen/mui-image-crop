/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-31 15:29:47
 * @LastEditTime: 2022-04-15 21:07:34
 */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Button, DialogActions, CircularProgress } from '@mui/material';

import { cropActionsPropTypes } from '../../common';

const ActionsRender = (props) => {
  const { onReset, onClose, onFinish, resetText, okText, cancelText } = props;
  const [ loading, setLoading ] = useState(false);
  const submit = useMemoizedFn(async () => {
    setLoading(true);
    await onFinish();
    setLoading(false);
  });
  return (
    <DialogActions>
      <Button
        variant='outlined'
        onClick={onClose}
        sx={{ ml: 2 }}
      >
        { cancelText }
      </Button>
      <Button
        variant='outlined'
        color='secondary'
        onClick={onReset}
      >
        { resetText }
      </Button>
      <Button
        variant='contained'
        disabled={loading}
        onClick={submit}
        sx={{ ml: 2 }}
      >
        { loading ? (
          <CircularProgress size={24} color='secondary'/>
        ) : okText }
      </Button>
    </DialogActions>
  );
};

ActionsRender.propTypes = {
  ...cropActionsPropTypes,
  onReset: PropTypes.func,
  onClose: PropTypes.func,
  onFinish: PropTypes.func,
};

export default ActionsRender;
