import React from 'react';
import { useControllableValue, useMemoizedFn, useSafeState } from 'ahooks';

import { fileToBase64, generateFileDownload } from './utils';
import CropDialog from './CropDialog';
import Uploader from './Uploader';
import ImageCard from './ImageCard';
import PreviewDialog from './PreviewDialog';
import ToolbarRender from './CropDialog/ToolbarRender';
import ActionsRender from './CropDialog/ActionsRender';
import TitleRender from './CropDialog/TitleRender';
import UploaderChild from './UploaderChild';
import './style.css';

const imageCardDefaultProps = {
  showDownloadIcon: false,
  showPreviewIcon: true,
  showRemoveIcon: true,
  removeText: 'Delete',
  previewText: 'Preview',
  downloadText: 'Download',
};

export const ImageCrop = (props) => {
  const {
    accept, uploaderProps, children, disabled,
    filename, imageCardProps, error,
    preview, previewDialogProps,
    imageCropDialogProps, cropperContainerStyle, imageCropDialogContentRootStyle, imageType, onFinish: onFinishProp, defaultAspect: defaultAspectProp,
    ...restProps
  } = props;
  const [ imageInfo, setImageInfo ] = useSafeState(null);
  const [ value, setValue ] = useControllableValue(props);
  const [ openPreview, setOpenPreview ] = useSafeState(false);
  const [ defaultAspect ] = useSafeState(() => defaultAspectProp ?? (props.aspect || 4 / 3));

  const onDropAccepted = useMemoizedFn(async (acceptedFiles, e) => {
    if (acceptedFiles?.length) {
      const img = await fileToBase64(acceptedFiles[0]);
      setImageInfo({
        url: img,
        originFile: acceptedFiles[0],
        name: acceptedFiles[0]?.name,
        type: acceptedFiles[0]?.type,
        size: acceptedFiles[0]?.size,
        lastModified: acceptedFiles[0]?.lastModified,
        lastModifiedDate: acceptedFiles[0]?.lastModifiedDate,
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
  const onFinish = useMemoizedFn(async (v) => {
    setValue(v);
    const res = await onFinishProp?.(v);
    return res;
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
        open={!!imageInfo?.url}
        onClose={onClose}
        imageInfo={imageInfo}
        onFinish={onFinish}
        dialogContentRootStyle={imageCropDialogContentRootStyle}
        cropperContainerStyle={cropperContainerStyle}
        dialogProps={imageCropDialogProps}
        filename={filename}
        imageType={imageType}
        defaultAspect={defaultAspect}
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
  accept: { 'image/*': [ '.jpg', '.jpeg', '.png', '.bmp' ] },
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

  imageCardProps: imageCardDefaultProps,

  okText: ' Ok ',
  resetText: 'Reset',
  cancelText: 'Cancel',
  originText: 'Origin',
  showOk: true,
  showReset: true,
  showCancel: true,
};

export default ImageCrop;
