import React from 'react';
import { CropperProps } from 'react-easy-crop';
import { DialogProps } from '@mui/material';

import { ImageCardProps, UploaderProps, ValueType, mark } from './types';
import TitleRender, { TitleRenderProps as cropTitleRenderProps } from './CropDialog/TitleRender';
import ToolbarRender, { ToolbarRenderProps as cropToolbarRenderProps } from './CropDialog/ToolbarRender';
import ActionsRender, { ActionsRenderProps as cropActionsRenderProps } from './CropDialog/ActionsRender';

export {
  cropTitleRenderProps,
  cropToolbarRenderProps,
  cropActionsRenderProps,
};

export interface ImageCropProps extends CropperProps {
  /**
   * @description controlled property, cropped imageInfo object, and its type is { name: string, type: string, size: number, originFile: File, width: number, height :number, url: string }
   * @description.zh-CN value 受控属性，为剪裁后的图片信息的对象， 类型为 { name: string, type: string, size: number, originFile: File, width: number, height :number, url: string }
   * @default null
   */
  value?: ValueType,


  /**
   * @description controlled property,trigged when value changes
   * @description.zh-CN 受控属性，value变化的回调
   * @param {value: { name: string, type: string, size: number, originFile: File, width: number, height :number, url: string }}
   * @return {void}
   */
  onChange?: (value: ValueType) => void,
  disabled?: boolean,
  filename?: string,
  error?: boolean,
  /** 启用预览?
   * @default true
   */
  preview?: boolean,
  /** 传递给预览对话框 Dialog的props */
  previewDialogProps?: DialogProps,
  /** 传递给图片剪裁对话框 Dialog的props */
  imageCropDialogProps?: DialogProps,
  cropperContainerStyle?: React.CSSProperties,
  imageCropDialogContentRootStyle?: React.CSSProperties,
  /** 上传图片的DropZone接受文件的类型
   * @default {'image/*':['.jpg','.jpeg','.png','.bmp']}
   */
  accept?: {[mimeType: string] : string[]},
  /** 传递给ImageCard的props
   * @default { showDownloadIcon: false,
    showPreviewIcon: true,
    showRemoveIcon: true,
    removeText: 'Delete',
    previewText: 'Preview',
    downloadText: 'Download' }
  */
  imageCardProps?: ImageCardProps,
  /** 传递给Upload组件的props */
  uploaderProps?: UploaderProps,

  /** 图片压缩质量
   * @default 0.96
   */
  qulity?: number,
  imageType?: string,
  /** 显示的标题
   * @default 'Image Crop'
   */
  title?: React.ReactNode,
  TitleRender?: typeof TitleRender | React.ReactNode,
  /** 显示调整长高比工具条?
   * @default true
   */
  showAspectToolbar?: boolean,
  /** 显示旋转角度工具条?
   * @default true
   */
  showRotateToolbar?: boolean,
  /** 显示缩放图片的工具条?
   * @default true
   */
  showZoomToolbar?: boolean,
  /** 自定义剪裁界面工具栏组件
   * ```
   * //以下props会被传递进去
   * zoom, onZoomChange, minZoom, maxZoom, zoomStep, showZoomToolbar,
    rotation, onRotationChange, rotateStep, showRotateToolbar, defaultAspect,
    aspect, onAspectChange, showAspectToolbar, aspectMarks,
    onReset, onClose, onFinish, width,
   * ```
   */
  ToolbarRender?: typeof ToolbarRender | React.FC | React.Component,
  /** 自定义底部按钮区域的组件
   * ```
   * //以下props会被传递
   * onReset, onClose, onFinish, onKeepOrigin, resetText, okText, cancelText, originText, showReset, showOk, showCancel, showOrigin
   * ```
   */
  ActionsRender?: typeof ActionsRender | React.FC | React.Component,
  /** 重置按钮的(文本)内容
   * @default 'Reset'
  */
  resetText?: React.ReactNode,
  /** 确认按钮的(文本)内容
   * @default 'Ok'
  */
  okText?: React.ReactNode,
  /** 取消按钮的(文本)内容
   * @default 'Cancel'
  */
  cancelText?: React.ReactNode,
  /** 使用原始图像(不裁剪)按钮的(文本)内容
   * @default 'Origin'
  */
  originText?: React.ReactNode,
  /** 显示重置按钮?
   * @default true
   */
  showReset?: boolean,
  /** 显示确认按钮?
   * @default true
   */
  showOk?: boolean,
  /** 显示取消按钮?
   * @default true
   */
  showCancel?: boolean,
  /** 显示使用原图按钮?
   * @default false
   */
  showOrigin?: boolean,
  /** 允许touch旋转图片?
   * @default false
  */
  allowTouchRotate?: boolean,
  /** 默认图像剪裁长高比(优先级低于aspect)
   * @default 4/3
   */
  defaultAspect?: number,
  /** 长宽比例变化时的回调 */
  onAspectChange?: (aspect: number) => void,
  /** 剪裁常高比的选项列表
   * @default [{ value: 0.25, label: '1:4' },
    { value: 0.33, label: '1:3' },
    { value: 0.5, label: '1:2' },
    { value: 0.75, label: '3:4' },
    { value: 1, label: '1:1' },
    { value: 1.33, label: '4:3' },
    { value: 2, label: '2:1' },
    { value: 3, label: '3:1' },
    { value: 4, label: '4:1' }]
   */
  aspectMarks?: mark[],
  /** 大小缩放的步进比例
   * @default 0.1
   */
  zoomStep?: number,
  /**
   * 旋转角度的步进度数
   * @default 1
   */
  rotateStep?: number,
  /** 点击Ok按钮的callback，传入当前图片内容,如果返回值不是false则会自动关闭窗口*/
  onFinish?: (value: ValueType) => any | Promise<any>,
}

export declare const ImageCrop: React.FC<React.PropsWithChildren<ImageCropProps>>;

export default ImageCrop;
