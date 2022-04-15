/*
 * @Description:
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-02 15:14:17
 * @LastEditTime: 2022-04-15 22:32:07
 */
import PropTypes from 'prop-types';

const imageCropPropTypes = {
  showGrid: PropTypes.bool, // true
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
  aspect: PropTypes.number,
  zoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
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

const dialogPropTypes = {
  BackdropComponent: PropTypes.elementType,
  BackdropProps: PropTypes.object,
  classes: PropTypes.object,
  closeAfterTransition: PropTypes.bool, // false
  component: PropTypes.elementType,
  components: PropTypes.shape({ Root: PropTypes.elementType }), // {}
  componentsProps: PropTypes.shape({ root: PropTypes.object }), // {}
  disableAutoFocus: PropTypes.bool, // false
  disableEnforceFocus: PropTypes.bool, // false
  disableEscapeKeyDown: PropTypes.bool, // false
  disablePortal: PropTypes.bool, // false
  disableRestoreFocus: PropTypes.bool, // false
  disableScrollLock: PropTypes.bool, // false
  hideBackdrop: PropTypes.bool, // false
  keepMounted: PropTypes.bool, // false
  fullScreen: PropTypes.bool, // false
  fullWidth: PropTypes.bool, // false
  maxWidth: PropTypes.oneOfType([
    PropTypes.oneOf([ 'xs', 'sm', 'md', 'lg', 'xl', false ]),
    PropTypes.string,
  ]), // 'md'
  onBackdropClick: PropTypes.func,
  PaperComponent: PropTypes.elementType, // Paper
  PaperProps: PropTypes.object,
  scroll: PropTypes.oneOf([ 'paper', 'body' ]), // 'paper'
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.func, PropTypes.object, PropTypes.bool ])),
    PropTypes.func,
    PropTypes.object,
  ]),
  TransitionComponent: PropTypes.elementType, // Fade
  transitionDuration: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]), // { enter: theme.transitions.duration.enteringScreen, exit: theme.transitions.duration.leavingScreen, }
  TransitionProps: PropTypes.object,
};

const cropActionsPropTypes = {
  resetText: PropTypes.node,
  okText: PropTypes.node,
  cancelText: PropTypes.node,
};

const imageCropSelfDefinePropTypes = {
  qulity: PropTypes.number,
  imageType: PropTypes.string,
  title: PropTypes.node,
  TitleRender: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ]), // props: title
  showAspectToolbar: PropTypes.bool,
  showRotateToolbar: PropTypes.bool,
  showZoomToolbar: PropTypes.bool,
  ToolbarRender: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ]), // props:zoom, onZoomChange, minZoom, maxZoom, zoomStep, showZoomToolbar, rotation, onRotationChange, rotateStep, showRotateToolbar, aspect, onAspectChange, showAspectToolbar, aspectMarks, onReset, onClose, onFinish, width, defaultAspect
  ActionsRender: PropTypes.oneOfType([ PropTypes.element, PropTypes.func ]), // props: onReset, onClose, onFinish, resetText, okText, cancelText
  okText: PropTypes.node,
  resetText: PropTypes.node,
  cancelText: PropTypes.node,
  zoomLabel: PropTypes.node,
  rotateLabel: PropTypes.node,
  aspectLabel: PropTypes.node,
  allowTouchRotate: PropTypes.bool,
  defaultAspect: PropTypes.number,
  onAspectChange: PropTypes.func,
  aspectMarks: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.any,
  })),
  zoomStep: PropTypes.number,
  rotateStep: PropTypes.number,
  onFinish: PropTypes.func, // (v:{name,url,size,originFile:File})=> boolen?  if return false, will not close
};

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
const imageCardDefaultProps = {
  showDownloadIcon: false,
  showPreviewIcon: true,
  showRemoveIcon: true,
  removeText: 'Delete',
  previewText: 'Preview',
  downloadText: 'Download',
};
const cropActionsDefaultProps = {
  okText: ' Ok ',
  resetText: 'Reset',
  cancelText: 'Cancel',
};

const uploaderPropsTypes = {
  style: PropTypes.object,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.func, PropTypes.array, PropTypes.object ]),
  // multiple: PropTypes.bool,
  // preventDropOnDocument: PropTypes.bool, // If false, allow dropped items to take over the current browser window
  // noClick: PropTypes.bool, // If true, disables click to open the native file selection dialog
  // noKeyboard: PropTypes.bool, // If true, disables SPACE/ENTER to open the native file selection dialog. * Note that it also stops tracking the focus state
  // noDrag: PropTypes.bool, // If true, disables drag 'n' drop
  // noDragEventsBubbling: PropTypes.bool, // If true, stops drag event propagation to parents
  minSize: PropTypes.number, // Minimum file size (in bytes)
  maxSize: PropTypes.number, // Maximum file size (in bytes)
  // maxFiles: PropTypes.number, // Maximum accepted number of files * The default value is 0 which means there is no limitation to how many files are accepted.
  // disabled: PropTypes.bool,
  // getFilesFromEvent: PropTypes.func, // Use this to provide a custom file aggregator  @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
  // onFileDialogCancel: PropTypes.func, // Cb for when closing the file dialog with no selection
  // onFileDialogOpen: PropTypes.func, // Cb for when opening the file dialog
  useFsAccessApi: PropTypes.bool, // Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API  to open the file picker instead of using an `<input type="file">` click event.
  // onDragEnter: PropTypes.func, // Cb for when the `dragenter` event occurs. @param {DragEvent} event
  // onDragLeave: PropTypes.func, // Cb for when the `dragleave` event occurs  @param {DragEvent} event
  // onDragOver: PropTypes.func, // Cb for when the `dragover` event occurs  @param {DragEvent} event
  // onDrop: PropTypes.func, // Cb for when the `drop` event occurs.   * Note that this callback is invoked after the `getFilesFromEvent` callback is done. Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props. Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected. If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props. @param {File[]} acceptedFiles;  @param {FileRejection[]} fileRejections; @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
  // onDropAccepted: PropTypes.func, // Cb for when the `drop` event occurs.   * Note that if no files are accepted, this callback is not invoked. @param {File[]} files  @param {(DragEvent|Event)} event
  // onDropRejected: PropTypes.func, // Cb for when the `drop` event occurs.   * Note that if no files are rejected, this callback is not invoked. @param {FileRejection[]} fileRejections ;@param {(DragEvent|Event)} event
  // validator: PropTypes.func, // Custom validation function   * @param {File} file   * @returns {FileError|FileError[]}
};
export {
  dialogPropTypes,
  imageCropPropTypes,
  cropActionsPropTypes,
  imageCropSelfDefinePropTypes,
  imageCardPropTypes,
  imageCardDefaultProps,
  cropActionsDefaultProps,
  uploaderPropsTypes,
};
