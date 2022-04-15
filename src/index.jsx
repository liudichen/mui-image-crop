import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useControllableValue, useMemoizedFn } from 'ahooks';

import { fileToBase64, generateFileDownload } from './utils';
import { imageCropPropTypes, imageCropSelfDefinePropTypes, imageCardPropTypes, uploaderPropsTypes, imageCardDefaultProps, cropActionsDefaultProps, dialogPropTypes } from './common';
import CropDialog from './CropDialog';
import Uploader from './Uploader';
import ImageCard from './ImageCard';
import PreviewDialog from './PreviewDialog';
import ToolbarRender from './CropDialog/ToolbarRender';
import ActionsRender from './CropDialog/ActionsRender';
import TitleRender from './CropDialog/TitleRender';
import UploaderChild from './UploaderChild';
import './style.css';

const ImageCrop = (props) => {
  const {
    accept, uploaderProps, children, disabled,
    filename, imageCardProps, error,
    preview, previewDialogProps,
    imageCropDialogProps, cropperContainerStyle, imageCropDialogContentRootStyle, imageType, onFinish: onFinishProp, defaultAspect: defaultAspectProp,
    ...restProps
  } = props;
  const [ imageInfo, setImageInfo ] = useState(null);
  const [ value, setValue ] = useControllableValue(props);
  const [ openPreview, setOpenPreview ] = useState(false);
  const [ defaultAspect ] = useState(() => defaultAspectProp ?? (props.aspect || 4 / 3));

  const onDropAccepted = useMemoizedFn(async (acceptedFiles, e) => {
    if (acceptedFiles?.length) {
      const img = await fileToBase64(acceptedFiles[0]);
      setImageInfo({
        src: img,
        name: acceptedFiles[0].name,
        type: acceptedFiles[0].type,
      });
    }
  });

  const onClose = useMemoizedFn(() => {
    setImageInfo(null);
  });

  const onRemove = useMemoizedFn(() => {
    imageCardProps?.onRemove?.();
    setValue(null);
  });
  const onPreview = useMemoizedFn(() => {
    if (!value) { return; }
    if (typeof imageCardProps?.onPreview === 'function') {
      imageCardProps.onPreview(value);
    } else {
      setOpenPreview(true);
    }
  });
  const onDownload = useMemoizedFn(() => {
    if (!value?.originFile) { return; }
    if (typeof imageCardProps?.onDownload === 'function') {
      imageCardProps.onDownload(value);
    } else {
      generateFileDownload(value.originFile);
    }
  });
  const onFinish = useMemoizedFn((v) => {
    setValue(v);
    onFinishProp?.(v);
  });

  return (
    <>
      { (!value?.url || !preview) ? (
        <Uploader
          onDropAccepted={onDropAccepted}
          disabled={disabled}
          accept={accept}
          {...(uploaderProps || {})}
        >
          { children || (<UploaderChild />)}
        </Uploader>
      ) : preview && (
        <ImageCard
          src={value.url}
          error={error}
          {...{ ...imageCardDefaultProps, ...(imageCardProps || {}), onRemove, onDownload, onPreview }}
        />
      )}
      <CropDialog
        open={!!imageInfo?.src}
        onClose={onClose}
        imageInfo={imageInfo}
        onFinish={onFinish}
        dialogContentRootStyle={imageCropDialogContentRootStyle}
        cropperContainerStyle={cropperContainerStyle}
        dialogProps={imageCropDialogProps}
        filename={filename}
        imageType={imageType}
        defaultAspect={defaultAspect}
        {...({ ...(cropActionsDefaultProps) })}
        {...restProps}
      />
      { preview && !!value?.url && (
        <PreviewDialog
          src={value.url}
          filename={value.name}
          {...{
            ...(previewDialogProps),
            open: openPreview,
            onClose: () => { setOpenPreview(false); previewDialogProps?.onClose?.(); },
          }}
        />
      )}
    </>
  );
};


ImageCrop.defaultProps = {
  preview: true,
  accept: 'image/*',
  qulity: 0.96,
  title: 'Image Crop',
  aspectMarks: [
    { value: 0.25, label: '1:4' },
    { value: 0.33, label: '1:3' },
    { value: 0.5, label: '1:2' },
    { value: 0.75, label: '3:4' },
    { value: 1, label: '1:1' },
    { value: 1.33, label: '4:3' },
    { value: 2, label: '2:1' },
    { value: 3, label: '3:1' },
    { value: 4, label: '4:1' },
  ],
  zoom: 1,
  aspect: 4 / 3,
  minZoom: 1,
  maxZoom: 3,
  zoomStep: 0.1,
  rotateStep: 1,
  showAspectToolbar: true,
  showRotateToolbar: true,
  showZoomToolbar: true,
  TitleRender,
  ToolbarRender,
  ActionsRender,
};

ImageCrop.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,

  preview: PropTypes.bool, // true
  previewDialogProps: PropTypes.shape({
    ...dialogPropTypes,
    onClose: PropTypes.func,
  }),

  children: PropTypes.node,
  imageCropDialogProps: PropTypes.object,
  cropperContainerStyle: PropTypes.object,
  imageCropDialogContentRootStyle: PropTypes.object,

  accept: PropTypes.oneOfType([ PropTypes.string, PropTypes.arrayOf(PropTypes.string) ]),

  imageCardProps: PropTypes.shape(imageCardPropTypes),
  uploaderProps: PropTypes.shape(uploaderPropsTypes),

  ...imageCropPropTypes,
  ...imageCropSelfDefinePropTypes,
};

export default ImageCrop;
