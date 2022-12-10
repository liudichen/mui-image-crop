import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Button, DialogActions, CircularProgress, DialogActionsProps } from '@mui/material';

export interface ActionsRenderProps {
  onReset?: () => void | Promise<void>,
  onClose?: () => void | Promise<void>,
  onFinish?: () => void | Promise<void>,
  onKeepOrigin?: () => void | Promise<void>,
  resetText?: React.ReactNode,
  okText?: React.ReactNode,
  cancelText?: React.ReactNode,
  originText?: React.ReactNode,
  /** 显示Reset-重置按钮? */
  showReset?: boolean,
  /** 显示OK-确认按钮? */
  showOk?: boolean,
  /** 显示Cancel-取消按钮? */
  showCancel?: boolean,
  /** 显示Origin-使用原图按钮? */
  showOrigin?: boolean,
  /** 传递给底部按钮区域DialogActions组件的props */
  actionsProps?: DialogActionsProps
}

export const ActionsRender = (props: ActionsRenderProps) => {
  const { onReset, onClose, onFinish, onKeepOrigin, resetText, okText, cancelText, originText, showReset, showOk, showCancel, showOrigin, actionsProps } = props;
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
    <DialogActions {...(actionsProps || {})}>
      {showCancel && (
        <Button
          variant='outlined'
          onClick={onClose}
          sx={{ ml: 2 }}
        >
          {cancelText}
        </Button>
      )}
      {showReset && (
        <Button
          variant='outlined'
          color='secondary'
          onClick={onReset}
        >
          {resetText}
        </Button>
      )}
      {showOrigin && (
        <Button
          variant='contained'
          color='secondary'
          disabled={originLoading}
          onClick={keepOrigin}
        >
          {originLoading ? (
            <CircularProgress size={24} color='secondary' />
          ) : originText}
        </Button>
      )}
      {showOk && (
        <Button
          variant='contained'
          disabled={loading}
          onClick={submit}
          sx={{ ml: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color='secondary' />
          ) : okText}
        </Button>
      )}
    </DialogActions>
  );
};
