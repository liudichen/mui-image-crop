/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-31 15:29:47
 * @LastEditTime: 2022-04-16 19:50:12
 */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Button, DialogActions, CircularProgress } from '@mui/material';

import { cropActionsPropTypes } from '../../common';

const ActionsRender = (props) => {
  const { onReset, onClose, onFinish, onKeepOrigin, resetText, okText, cancelText, originText, showReset, showOk, showCancel, showOrigin } = props;
  const [ loading, setLoading ] = useState(false);
  const [ originLoading, setOriginLoading ] = useState(false);
  const submit = useMemoizedFn(async () => {
    setLoading(true);
    await onFinish?.();
    setLoading(false);
  });
  const keepOrigin = useMemoizedFn(async () => {
    setOriginLoading(true);
    await onKeepOrigin?.();
    setOriginLoading(false);
  });
  return (
    <DialogActions>
      { showCancel && (
        <Button
          variant='outlined'
          onClick={onClose}
          sx={{ ml: 2 }}
        >
          { cancelText }
        </Button>
      )}
      { showReset && (
        <Button
          variant='outlined'
          color='secondary'
          onClick={onReset}
        >
          { resetText }
        </Button>
      )}
      { showOrigin && (
        <Button
          variant='contained'
          color='secondary'
          disabled={originLoading}
          onClick={keepOrigin}
        >
          { originLoading ? (
            <CircularProgress size={24} color='secondary'/>
          ) : originText }
        </Button>
      )}
      { showOk && (
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
      )}
    </DialogActions>
  );
};

ActionsRender.propTypes = {
  ...cropActionsPropTypes,
  onReset: PropTypes.func,
  onClose: PropTypes.func,
  onFinish: PropTypes.func,
  onKeepOrigin: PropTypes.func,
};

export default ActionsRender;
