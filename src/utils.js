/*
 * @Description: https://codesandbox.io/s/react-easy-crop-custom-image-demo-forked-g27rnp?file=/src/canvasUtils.js:244-272
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-03-30 14:40:44
 * @LastEditTime: 2022-04-03 16:32:56
 */
const createImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
};

const getRadianAngle = (degreeValue) => {
  return (degreeValue * Math.PI) / 180;
};

const rotateSize = (width, height, rotation) => {
  const rotRad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

const getCroppedImage = async (
  imageSrc,
  pixelCrop,
  rotation = 0,
  type = 'image/png',
  name = 'image.png',
  quality = 0.96,
  flip = { horizontal: false, vertical: false }
) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) { return null; }

  const rotRad = getRadianAngle(rotation);
  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );
  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // 如果不是png则把透明的背景替换成白色，避免生成黑色背景
  if (type !== 'image/png') {
    for (let i = 0; i < data.data.length; i += 4) {
      if (data.data[i + 3] === 0) {
        data.data[i] = 255;
        data.data[i + 1] = 255;
        data.data[i + 2] = 255;
        data.data[i + 3] = 255;
      }
    }
  }

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');
  const url = canvas.toDataURL(type, quality);

  // As a blob
  return new Promise((resolve, _reject) => {
    canvas.toBlob((blob) => {
      // resolve(URL.createObjectURL(file));
      const file = new File([ blob ], name, { type });
      const result = {
        originFile: file,
        url,
        name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        width: pixelCrop.width,
        height: pixelCrop.height,
      };
      resolve(result);
    }, 'type', quality);
  });
};

/**
 * @description file转Base64
 * @param {File} file 文件
 * @return {string} base64
 */
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (e) => {
      reject('文件读取错误');
    };
  });
};

/**
 * @description 生成文件下载
 * @param {Blob} fileBlob File对象
 * @param {string?} fileName 下载文件的默认下载名称
 */
const generateFileDownload = (fileBlob, fileName) => {
  if (!fileBlob) return;
  const href = URL.createObjectURL(fileBlob);
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName || fileBlob?.name || '文件';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(href);
};

export {
  createImage,
  getRadianAngle,
  rotateSize,
  getCroppedImage,
  fileToBase64,
  generateFileDownload,
};
