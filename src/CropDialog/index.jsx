
/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-31 08:54:41
 * @LastEditTime: 2022-04-16 20:36:30
 */
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useMemoizedFn } from 'ahooks';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import Cropper from 'react-easy-crop';

import { getCroppedImage, getOriginImage } from '../utils';
import { dialogPropTypes, imageCropPropTypes, imageCropSelfDefinePropTypes, cropActionsPropTypes } from '../common';

const CropDialog = (props) => {
  const {
    crop: cropProp, onCropChange: onCropChangeProp, onCropComplete: onCropCompleteProp,
    imageInfo, qulity, imageType,
    showAspectToolbar, aspect: aspectProp, onAspectChange: onAspectChangeProp, aspectMarks, defaultAspect,
    showZoomToolbar, zoom: zoomProp, minZoom, maxZoom, zoomStep, onZoomChange: onZoomChangeProp,
    showRotateToolbar, rotation: rotationProp, onRotationChange: onRotationChangeProp, allowTouchRotate, rotateStep,
    open, onClose: onCloseProp, onFinish: onFinishProp, okText, cancelText, resetText, originText, showOk, showCancel, showReset, showOrigin,
    TitleRender, title, ActionsRender, ToolbarRender,
    dialogProps, cropperContainerStyle, dialogContentRootStyle,
    ...restProps
  } = props;
  const [ crop, setCrop ] = useState(cropProp ?? { x: 0, y: 0 });
  const [ croppedAreaPixels, setCroppedAreaPixels ] = useState(props?.initialCroppedAreaPixels ?? null);
  const [ zoom, setZoom ] = useState(zoomProp ?? 1);
  const [ rotation, setRotation ] = useState(rotationProp ?? 0);
  const [ aspect, setAspect ] = useState(aspectProp ?? defaultAspect);
  const ref = useRef();

  const onRotationChange = useMemoizedFn((v) => {
    // avoid rotating by touching in a mobile browser
    if (`${v || 0}`.length < 8 || allowTouchRotate) {
      setRotation(v);
      onRotationChangeProp?.(v);
    }
  });
  const onZoomChange = useMemoizedFn((v) => {
    setZoom(v);
    onZoomChangeProp?.(v);
  });
  const onCropChange = useMemoizedFn((v) => {
    setCrop(v);
    onCropChangeProp?.(v);
  });
  const onAspectChange = useMemoizedFn((v) => {
    setAspect(v);
    onAspectChangeProp?.(v);
  });
  const onCropComplete = useMemoizedFn((_croppedArea, _croppedAreaPixels) => {
    setCroppedAreaPixels(_croppedAreaPixels);
    onCropCompleteProp?.(_croppedArea, _croppedAreaPixels);
  });

  const onReset = useMemoizedFn(() => {
    setCrop({ x: 0, y: 0 });
    setCroppedAreaPixels(null);
    onRotationChange(0);
    onAspectChange(defaultAspect);
    onZoomChange(1);
  });
  const onClose = useMemoizedFn(() => {
    onReset();
    onCloseProp?.();
  });
  const onFinish = useMemoizedFn(async () => {
    const res = await getCroppedImage(imageInfo.url, croppedAreaPixels, rotation, imageType ?? (imageInfo?.type || 'image/png'), imageInfo?.name || 'image.png', qulity);

    const flag = await onFinishProp?.(res);
    if (flag !== false) {
      onClose();
    }
  });

  const onKeepOrigin = useMemoizedFn(async () => {
    const res = await getOriginImage(imageInfo);
    const flag = await onFinishProp?.(res);
    if (flag !== false) {
      onClose();
    }
  });

  return (
    <Dialog
      {...{ maxWidth: 'md', ...(dialogProps || {}), open, onClose }}
    >
      <DialogTitle>
        { TitleRender ? (
          <TitleRender
            title={title}
            onClose={onClose}
          />
        ) : title }
      </DialogTitle>
      <DialogContent
        style={{
          ...(dialogContentRootStyle || {}),
        }}
      >
        <Box
          ref={ref}
          style={{
            position: 'relative',
            margin: 'auto',
            width: 300,
            height: 300,
            ...(cropperContainerStyle || {}),
          }}>
          <Cropper
            {...restProps}
            image={imageInfo?.url}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            aspect={aspect}
            onCropChange={onCropChange}
            onRotationChange={onRotationChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
        </Box>
        {!!ToolbarRender && (
          <ToolbarRender
            showAspectToolbar={showAspectToolbar}
            showRotateToolbar={showRotateToolbar}
            showZoomToolbar={showZoomToolbar}
            zoom={zoom}
            onZoomChange={onZoomChange}
            minZoom={minZoom}
            maxZoom={maxZoom}
            zoomStep={zoomStep}
            rotation={rotation}
            onRotationChange={onRotationChange}
            rotateStep={rotateStep}
            aspect={aspect}
            aspectMarks={aspectMarks}
            onAspectChange={onAspectChange}
            onClose={onClose}
            onFinish={onFinish}
            onReset={onReset}
            width={ref.current?.offsetWidth}
            defaultAspect={defaultAspect}
          />
        ) }
      </DialogContent>
      { !!ActionsRender && (
        <ActionsRender
          onReset={onReset}
          onClose={onClose}
          onFinish={onFinish}
          okText={okText}
          cancelText={cancelText}
          resetText={resetText}
          originText={originText}
          showOk={showOk}
          showCancel={showCancel}
          showReset={showReset}
          showOrigin={showOrigin}
          onKeepOrigin={onKeepOrigin}
        />
      )}
    </Dialog>
  );
};

CropDialog.propTypes = {
  cropperContainerStyle: PropTypes.object,
  imageInfo: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    originFile: PropTypes.object,
    size: PropTypes.number,
    lastModified: PropTypes.any,
    lastModifiedDate: PropTypes.any,
  }),
  dialogContentRootStyle: PropTypes.object,

  ...imageCropSelfDefinePropTypes,
  ...cropActionsPropTypes,

  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dialogProps: PropTypes.shape(dialogPropTypes),
  ...imageCropPropTypes,
};

export default CropDialog;