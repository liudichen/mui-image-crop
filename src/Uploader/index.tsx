import React from 'react';
import { useDropzone } from 'react-dropzone';
import type { DropEvent } from 'react-dropzone';
import classNames from 'classnames';

import { prefixCls } from '../utils';
import type { UploaderProps as UploaderCommonProps } from '../types';

export interface UploaderProps extends UploaderCommonProps {
  accept?: { [key: string]: string[] };
  disabled?: boolean;
  onDropAccepted?: (files: File[], e: DropEvent) => void;
}

export const Uploader = (props: React.PropsWithChildren<UploaderProps>) => {
  const { children, className: classNameProp, style, ...restProps } = props;
  const { getInputProps, getRootProps } = useDropzone({
    ...restProps,
    maxFiles: 1,
    multiple: false,
  });
  const className = classNames(
    prefixCls,
    {
      [`${prefixCls}-select`]: true,
      [`${prefixCls}-select-picture-card`]: true,
      [`${prefixCls}-disabled`]: props.disabled,
    },
    classNameProp,
  );
  return (
    <div {...getRootProps({ className, style })}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
