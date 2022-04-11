<!--
 * @Description: 
 * @Author: 柳涤尘 https://www.iimm.ink
 * @LastEditors: 柳涤尘 liudichen@foxmail.com
 * @Date: 2022-04-11 21:09:57
 * @LastEditTime: 2022-04-11 21:17:51
-->
# mui-image-crop

使用MUI(@mui/material)时类似antd Upload组件picture-card预览样式的image Crop。

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