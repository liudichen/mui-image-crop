# mui-image-crop

使用MUI(@mui/material)时类似antd Upload组件picture-card预览样式的image Crop。
默认具有缩放、旋转、宽高比工具栏，支持自定义

> 主要是自用，默认预览样式部分直接使用的antd upload组件的picture-card的样式。

## 安装

```bash
npm i mui-image-crop
```

## 使用

如果时es模式直接：
```javascript
import React, {useState} from 'react';
import ImageCrop from 'mui-image-crop';

const Sample = (props) => {
  const [value, setValue] = props;
  return (
    <ImageCrop
      value={value}
      onChange={setValue}
      preview
    >
  )
}
```

如果发现缺少默认的样式(一个104*104)的方框，则需手动导入css（es模块可不需要手动导入）:
```javascript
import 'mui-image-crop/dist/style.css';
```

## 自定义

本组件可接收children，children会作为uploader（点击或拖拽上传）使用，无children时，默认为antd Upload组件的picture-card样式。也可以通过uploaderProps进行自定义容器样式，比如不需要预览，只需要一个按钮作为上传组件：
```javascript
<ImageCrop
  preview={false}
  uploaderProps={{
    style: {
      border: 'none',
      width: 'auto',
      height: 'auto',
    },
  }}
  // showAspectToolbar={false}
  // aspect={1}
  // onFinish={onFinish}
>
```
可以自定义onFinish来进行结果提交，onFinish为一个异步函数，参数就是value （{name,url,size,originFile:File}），其中name为文件名,url为base64字符串，originFile为文件对象，如果返回true，则对话框会自动关闭


## 支持的props

```javascript
  ImageCrop.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,

  preview: PropTypes.bool, // true

  children: PropTypes.node,
  imageCropDialogProps: PropTypes.object,
  cropperContainerStyle: PropTypes.object,
  imageCropDialogContentRootStyle: PropTypes.object,

  accept: PropTypes.oneOfType([ PropTypes.string, PropTypes.arrayOf(PropTypes.string) ]),

  cropActionsProps: PropTypes.shape(cropActionsPropTypes),
  imageCardProps: PropTypes.shape(imageCardPropTypes),
  uploaderProps: PropTypes.shape(uploaderPropsTypes),

  ...imageCropPropTypes,
  ...imageCropSelfDefinePropTypes,
};
```

其中`imageCropPropTypes`主要为`react-easy-crop`的props:
```javascript
const imageCropPropTypes = {
  showGrid: PropTypes.bool, // 是否显示网格 true
  restrictPosition: PropTypes.bool,
  object: PropTypes.oneOf([ 'contain', 'horizontal-cover', 'vertical-cover' ]), // 'contain'
  crop: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  cropShape: PropTypes.oneOf([ 'rect', 'round' ]), // 'rect'
  cropSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  onCropChange: PropTypes.func, // crop: {x: number,y: number} => void
  onCropSizeChange: PropTypes.func, // cropSize: {width: number,height: number} => void
  onCropComplete: PropTypes.func, // (croppedArea: {x: number,y: number,width: number,height: number},croppedAreaPixels: {x: number,y: number,width: number,height: number})=>void
  onCropAreaChange: PropTypes.func, // (croppedArea: {x: number,y: number,width: number,height: number},croppedAreaPixels: {x: number,y: number,width: number,height: number})=>void
  initialCroppedAreaPercentages: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  initialCroppedAreaPixels: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  aspect: PropTypes.number, // 4/3
  zoom: PropTypes.number, 
  minZoom: PropTypes.number, // 1
  maxZoom: PropTypes.number, // 3
  zoomSpeed: PropTypes.number, // 1
  zoomWithScroll: PropTypes.bool, // true
  onZoomChange: PropTypes.func, // zoom: number => void
  rotation: PropTypes.number,
  onRotationChange: PropTypes.func, // rotation: number => void
  transform: PropTypes.string, // `translate(${crop.x}px, ${crop.y}px) rotate(${rotation}deg) scale(${zoom})`
  mediaProps: PropTypes.object,
  style: PropTypes.shape({
    containerStyle: PropTypes.object,
    mediaStyle: PropTypes.object,
    cropAreaStyle: PropTypes.object,
  }),
  classes: PropTypes.shape({
    containerClassName: PropTypes.string,
    mediaClassName: PropTypes.string,
    cropAreaClassName: PropTypes.string,
  }),
  onInteractionStart: PropTypes.func, // () => void
  onInteractionEnd: PropTypes.func, // () => void
  onMediaLoaded: PropTypes.func, // mediaSize: {width: number,height: number,naturalWidth: number,naturalHeight: number}=>void
  onTouchRequest: PropTypes.func, // (e: React.TouchEvent<HTMLDivElement>) => boolean
  onWheelRequest: PropTypes.func, // (e: WheelEvent) => boolean
  disableAutomaticStylesInjection: PropTypes.bool, // Whether to auto inject styles using a style tag in the document head on component mount. When disabled you need to import the css file into your application manually (style file is available in react-easy-crop/react-easy-crop.css). Example with sass/scss @import "~react-easy-crop/react-easy-crop";.
};
```

`imageCropSelfDefinePropTypes`是一些自定义的props：
```javascript
const imageCropSelfDefinePropTypes = {
  qulity: PropTypes.number,
  imageType: PropTypes.string, // 剪裁后图片类型，默认为原图片类型，如果不自持一般会自动置为 image/png
  title: PropTypes.node,  // 剪裁框的标题
  RenderTitle: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ]), // props: title
  showAspectToolbar: PropTypes.bool,  // 是否显示宽高比工具栏 
  showRotateToolbar: PropTypes.bool,  // 是否显示旋转工具栏
  showZoomToolbar: PropTypes.bool,    // 是否显示缩放工具栏
  RenderToolbar: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ]), // 工具栏组件，以下props会被注入 props:zoom, onZoomChange, minZoom, maxZoom, zoomStep, showZoomToolbar, rotation, onRotationChange, rotateStep, showRotateToolbar, aspect, onAspectChange, showAspectToolbar, aspectMarks, onReset, onClose, onFinish, width, defaultAspect
  RenderActions: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ]), // DialogActions组件，以下props会被注入： props: onReset, onClose, onFinish, resetText, okText, cancelText
  okText: PropTypes.node, // 确认按钮内容 OK
  resetText: PropTypes.node,  // 重置按钮内容 Reset
  cancelText: PropTypes.node, // 取消按钮内容 Cancel
  zoomLabel: PropTypes.node,
  rotateLabel: PropTypes.node,
  aspectLabel: PropTypes.node,
  allowTouchRotate: PropTypes.bool, // 是否允许触摸旋转 false
  defaultAspect: PropTypes.number,  // 默认的宽高比
  onAspectChange: PropTypes.func,  // 宽高比变化触发 api: (aspect) => void
  aspectMarks: PropTypes.arrayOf(PropTypes.shape({  
    value: PropTypes.number,
    label: PropTypes.any,
  })), // 可选宽高比列表  [   { value: 0.25, label: '1:4' },  { value: 0.33, label: '1:3' },  { value: 0.5, label: '1:2' },  { value: 0.75, label: '3:4' },  { value: 1, label: '1:1' },  { value: 1.33, label: '4:3' },  { value: 2, label: '2:1' },  { value: 3, label: '3:1' },  { value: 4, label: '4:1' }, ]
  zoomStep: PropTypes.number, // 缩放时的步长（百分比） 0.1
  rotateStep: PropTypes.number, // 旋转时的角度步长 1
  onFinish: PropTypes.func, // (v:{name,url,size,originFile:File})=> boolen?  if return false, will not close
};

```

`imageCardPropTypes`为剪裁图片后的预览卡片的相关样式(如果不需要预览可以`preview`置为false):
```javascript
const imageCardPropTypes = {
  style: PropTypes.object,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.func, PropTypes.array, PropTypes.object ]),
  showDownloadIcon: PropTypes.bool,
  showPreviewIcon: PropTypes.bool,
  showRemoveIcon: PropTypes.bool,
  customDownloadIcon: PropTypes.node,
  customPreviewIcon: PropTypes.node,
  customRemoveIcon: PropTypes.node,
  onDownload: PropTypes.func,
  onPreview: PropTypes.func,
  onRemove: PropTypes.func,
  downloadText: PropTypes.string,
  previewText: PropTypes.string,
  removeText: PropTypes.string,
};
```

`cropActionsPropTypes`为剪切窗口的底部按钮props：
```javascript
const cropActionsPropTypes = {
  resetText: PropTypes.node,
  okText: PropTypes.node,
  cancelText: PropTypes.node,
};
```
`uploaderPropsTypes`为点击或拖拽上传组件的props(实际为`react-dropzone`的部分props)：
```javascript
const uploaderPropsTypes = {
  style: PropTypes.object,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.func, PropTypes.array, PropTypes.object ]),
  minSize: PropTypes.number, // Minimum file size (in bytes)
  maxSize: PropTypes.number, // Maximum file size (in bytes)
  useFsAccessApi: PropTypes.bool, // Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API  to open the file picker instead of using an `<input type="file">` click event.
};
```

