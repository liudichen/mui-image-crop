import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, DialogActions, CircularProgress } from '@mui/material';

const ActionsRender = (props) => {
  const { onReset, onClose, onFinish, onKeepOrigin, resetText, okText, cancelText, originText, showReset, showOk, showCancel, showOrigin } = props;
  const [ loading, setLoading ] = useSafeState(false);
  const [ originLoading, setOriginLoading ] = useSafeState(false);
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

export default ActionsRender;
