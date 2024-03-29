import type { ICroppedImage } from '../types';

export const prefixCls = 'imageCrop';

export const createImage = (url: string): Promise <HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });
};

export const getRadianAngle = (degreeValue: number) => {
  return (degreeValue * Math.PI) / 180;
};

export const rotateSize = (width: number, height: number, rotation: number) => {
  const rotRad = getRadianAngle(rotation);
  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
};

export const getOriginImage = async (imageInfo: ICroppedImage) => {
  if (!imageInfo?.url) { return; }
  const image = await createImage(imageInfo.url);
  const { width, height } = image;
  return {
    ...imageInfo,
    width,
    height,
  };
};

export const getCroppedImage = async (
  imageSrc: string,
  pixelCrop: {x:number, y:number, width:number, height:number},
  rotation = 0,
  type = 'image/png',
  name = 'image.png',
  quality = 0.96,
  flip = { horizontal: false, vertical: false },
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
    rotation,
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
    pixelCrop.height,
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
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      // @ts-ignore
      const file = new File([ blob ], name, { type });
      const result = {
        originFile: file,
        url,
        name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        // @ts-ignore
        lastModifiedDate: file.lastModifiedDate,
        width: pixelCrop.width,
        height: pixelCrop.height,
      };
      resolve(result);
    }, 'type', quality);
  });
};

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject('文件读取错误');
    };
  });
};

export const generateFileDownload = (fileBlob: File, fileName = '') => {
  if (!fileBlob) return;
  const href = URL.createObjectURL(fileBlob);
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName || fileBlob?.name || '图片.请修改扩展名';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(href);
};
