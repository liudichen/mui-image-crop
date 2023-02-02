import React from 'react';
import classNames from 'classnames';
import { IconEye, IconTrash, IconDownload } from '@tabler/icons-react';

import type { ImageCardProps as ImageCardCommonProps } from '../types';
import { prefixCls } from '../utils';

export interface ImageCardProps extends ImageCardCommonProps {
  src?: string,
  filename?: string,
}

export const ImageCard = (props: ImageCardProps) => {
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
      // @ts-ignore
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
      // @ts-ignore
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

ImageCard.displayName = 'iimm.Mui.ImageCrop.ImageCard';
