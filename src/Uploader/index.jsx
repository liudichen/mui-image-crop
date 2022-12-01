import React from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';

const prefixCls = 'imageCrop';

const Uploader = (props) => {
  const {
    children,
    className: classNameProp,
    style,
    ...restProps
  } = props;
  const { getInputProps, getRootProps } = useDropzone({ ...restProps, maxFiles: 1, multiple: false });
  const className = classNames(prefixCls, {
    [`${prefixCls}-select`]: true,
    [`${prefixCls}-select-picture-card`]: true,
    [`${prefixCls}-disabled`]: props.disabled,
  }, classNameProp);
  return (
    <div
      {...getRootProps({ className, style })}
    >
      <input {...getInputProps()} />
      {
        children
      }
    </div>
  );
};

Uploader.defaultProps = {
  accept: { 'image/*': [ '.jpg', '.jpeg', '.png', '.bmp' ] },
};

export default Uploader;
