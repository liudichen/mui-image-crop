import React from 'react';
import { IconPlus } from '@tabler/icons-react';

export const UploaderChild = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'table' }}>
      <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
        <IconPlus />
      </div>
    </div>
  );
};

UploaderChild.displayName = 'iimm.Mui.ImageCrop.DefaultUploaderChildren';
