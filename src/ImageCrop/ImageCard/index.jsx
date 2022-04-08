/*
 * @Description: 裁剪后的图片显示卡片
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-02 09:04:56
 * @LastEditTime: 2022-04-02 17:05:58
 */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { IconEye, IconTrash, IconDownload } from '@tabler/icons';

import { imageCardPropTypes } from '../common';

const prefixCls = 'imageCrop';

const ImageCard = (props) => {
  const {
    src,
    className: classNameProp,
    style,
    showPreviewIcon, customPreviewIcon, onPreview, previewText,
    showDownloadIcon, customDownloadIcon, onDownload, downloadText,
    showRemoveIcon, customRemoveIcon, onRemove, removeText,
    filename,
  } = props;
  const containerClassName = classNames(`${prefixCls}-list-picture-card-container`, classNameProp);
  const previewIcon = showPreviewIcon ? (
    <span
      role='img'
      className={`${prefixCls}Icon-icon`}
      onClick={onPreview}
      title={previewText}
    >
      { customPreviewIcon || <IconEye size='20px'/> }
    </span>
  ) : null;
  const downloadIcon = showDownloadIcon ? (
    <span
      role='img'
      className={`${prefixCls}Icon-icon`}
      onClick={onDownload}
      title={downloadText}
    >
      { customDownloadIcon || <IconDownload size='20px' />}
    </span>
  ) : null;
  const removeIcon = showRemoveIcon ? (
    <span
      role='img'
      className={`${prefixCls}Icon-icon`}
      onClick={onRemove}
      title={removeText}
    >
      { customRemoveIcon || <IconTrash size='20px' />}
    </span>
  ) : null;
  const preview = (
    <span className={`${prefixCls}-span`}>
      <a
        className={`${prefixCls}-list-item-thumbnail`}
        onClick={onPreview}
        href={src}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={src}
          alt={filename}
          className={`${prefixCls}-list-item-image`}
        />
      </a>
    </span>
  );
  const actions = (
    <span className={`${prefixCls}-list-item-actions`}>
      { previewIcon }
      { downloadIcon}
      { removeIcon }
    </span>
  );
  return (
    <div className={`${prefixCls}-list ${prefixCls}-list-picture-card`}>
      <div className={containerClassName} style={style}>
        <div className={`${prefixCls}-list-item ${prefixCls}-list-item-picture-card`}>
          <div className={`${prefixCls}-list-item-info`}>
            { preview }
          </div>
          {actions}
        </div>
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  src: PropTypes.string,
  filename: PropTypes.string,

  ...imageCardPropTypes,
};

export default ImageCard;
