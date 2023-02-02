import React from 'react';
import { useMemoizedFn, useSafeState } from 'ahooks';
import { Box, Dialog, DialogContent, DialogTitle } from '@mui/material';
import type { DialogProps } from '@mui/material';
import Cropper from 'react-easy-crop';
import type { CropperProps } from 'react-easy-crop';

import { getCroppedImage, getOriginImage } from '../utils';
import type { ICroppedImage, IMarkItem } from '../types';
import type { ActionsRenderProps } from './ActionsRender';
import type { ToolbarRenderProps } from './ToolbarRender';
import type { TitleRenderProps } from './TitleRender';

export interface CropDialogProps extends Omit<CropperProps, 'image'>, Omit<ActionsRenderProps, 'onFinish'> {
  imageInfo: ICroppedImage,
  qulity?: number,
  imageType?: string,
  showAspectToolbar?: boolean,
  onAspectChange?: (aspect: number) => void,
  defaultAspect?: number,
  aspectMarks: IMarkItem[],
  showZoomToolbar?: boolean,
  zoomStep: number,
  showRotateToolbar?: boolean,
  rotateStep: number,
  zoomLabel?: React.ReactNode,
  rotateLabel?: React.ReactNode,
  aspectLabel?: React.ReactNode,
  allowTouchRotate?: boolean,
  title?: React.ReactNode,
  TitleRender?: React.ComponentType<TitleRenderProps>,
  ActionsRender?: React.ComponentType<ActionsRenderProps>,
  ToolbarRender?: React.ComponentType<ToolbarRenderProps>,
  dialogProps?: DialogProps,
  cropperContainerStyle?: React.CSSProperties,
  dialogContentRootStyle?: React.CSSProperties,
  open: boolean,
  onClose: () => void,
  onFinish: (value: ICroppedImage) => void | boolean | Promise<void | boolean>,
}

export const CropDialog = (props: CropDialogProps) => {
  const {
    crop: cropProp, onCropChange: onCropChangeProp, onCropComplete: onCropCompleteProp,
    imageInfo, qulity, imageType,
    showAspectToolbar, aspect: aspectProp, onAspectChange: onAspectChangeProp, aspectMarks, defaultAspect,
    showZoomToolbar, zoom: zoomProp, minZoom, maxZoom, zoomStep, onZoomChange: onZoomChangeProp,
    showRotateToolbar, rotation: rotationProp, onRotationChange: onRotationChangeProp, allowTouchRotate, rotateStep,
    open, onClose: onCloseProp, onFinish: onFinishProp, okText, cancelText, resetText, originText, showOk, showCancel, showReset, showOrigin,
    TitleRender, title, ActionsRender, ToolbarRender,
    dialogProps, cropperContainerStyle, dialogContentRootStyle,
    actionsProps,
    ...restProps
  } = props;
  const [ crop, setCrop ] = useSafeState(cropProp ?? { x: 0, y: 0 });
  const [ croppedAreaPixels, setCroppedAreaPixels ] = useSafeState(props?.initialCroppedAreaPixels ?? null);
  const [ zoom, setZoom ] = useSafeState(zoomProp ?? 1);
  const [ rotation, setRotation ] = useSafeState(rotationProp ?? 0);
  const [ aspect, setAspect ] = useSafeState(aspectProp ?? defaultAspect);
  const ref = React.useRef();

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
    // @ts-ignore
    const res = await getCroppedImage(imageInfo.url, croppedAreaPixels, rotation, imageType ?? (imageInfo?.type || 'image/png'), imageInfo?.name || 'image.png', qulity);

    const flag = await onFinishProp?.(res as ICroppedImage);
    if (flag !== false) {
      onClose();
    }
  });

  const onKeepOrigin = useMemoizedFn(async () => {
    const res = await getOriginImage(imageInfo as ICroppedImage);
    const flag = await onFinishProp?.(res as ICroppedImage);
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
            // @ts-ignore
            width={ref.current?.offsetWidth}
            defaultAspect={defaultAspect}
          />
        ) }
      </DialogContent>
      { !!ActionsRender && (
        <ActionsRender
          actionsProps={actionsProps}
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

CropDialog.displayName = 'iimm.Mui.ImageCrop.CropDialog';
