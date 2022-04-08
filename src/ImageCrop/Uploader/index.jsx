/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-30 13:38:33
 * @LastEditTime: 2022-04-02 16:35:21
 */
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';

import { uploaderPropsTypes } from '../common';

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
  accept: 'image/*',
};

Uploader.propTypes = {
  accept: PropTypes.oneOfType([ PropTypes.string, PropTypes.arrayOf(PropTypes.string) ]),
  disabled: PropTypes.bool,
  onDropAccepted: PropTypes.func, // Cb for when the `drop` event occurs.   * Note that if no files are accepted, this callback is not invoked. @param {File[]} files  @param {(DragEvent|Event)} event

  ...uploaderPropsTypes,
};

export default Uploader;
