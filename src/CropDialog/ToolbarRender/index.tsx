import React from 'react';
import { useMemoizedFn, useCreation, useUpdate, useSafeState } from 'ahooks';
import { Box, Slider, Stack } from '@mui/material';
import { SliderProps } from '@mui/material';
import { IconZoomIn, IconZoomOut, IconAspectRatio, IconRotate2, IconRotateClockwise2 } from '@tabler/icons';

import { ICroppedImage, IMarkItem } from '../../types';

type NumberChangeFn = (newValue: number) => void;

export interface ToolbarRenderProps {
  zoom: number,
  onZoomChange: NumberChangeFn,
  minZoom: number,
  maxZoom: number,
  zoomStep: number,
  showZoomToolbar?: boolean,
  rotation: number,
  onRotationChange: NumberChangeFn,
  rotateStep: number,
  showRotateToolbar?: boolean,
  defaultAspect?: number,
  aspect: number,
  onAspectChange: NumberChangeFn,
  showAspectToolbar?: boolean,
  aspectMarks: IMarkItem[],
  onReset?: () => void,
  onClose?: () => void,
  width?: number | string,
  onFinish: (value: ICroppedImage) => void | Promise<void>;
}

export const ToolbarRender = (props: ToolbarRenderProps) => {
  const {
    zoom, onZoomChange, minZoom, maxZoom, zoomStep, showZoomToolbar,
    rotation, onRotationChange, rotateStep, showRotateToolbar, defaultAspect,
    aspect, onAspectChange, showAspectToolbar, aspectMarks,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onReset, onClose, onFinish, width,
  } = props;
  const update = useUpdate();
  const marks = useCreation(() => {
    return (aspectMarks || []).sort((a, b) => b.value - a.value).map((item, index) => ({ value: index, label: item.label, aspect: item.value }));
  }, [ aspectMarks ]);

  const aspectProps = useCreation(() => {
    const result: Partial<SliderProps> = { min: 0, max: marks.length - 1, marks };
    result.valueLabelFormat = (v) => marks[v].label;
    return result;
  }, [ marks ]);
  const calculateAspectSliderValue = useMemoizedFn((asp) => {
    const index = (aspectMarks || []).findIndex((item) => Math.abs(item.value - asp) < 0.1);
    return index === -1 ? 0 : index;
  });
  const [ value, setValue ] = useSafeState(() => calculateAspectSliderValue(aspect));
  const onChange = useMemoizedFn((e, v) => {
    setValue(v);
    const aspect = marks[v]?.aspect ?? defaultAspect;
    onAspectChange(aspect);
  });

  const handleZoom = useMemoizedFn((d) => {
    let newZoom = d === 'out' ? zoom - zoomStep : zoom + zoomStep;
    if (newZoom > maxZoom) {
      newZoom = maxZoom;
    } else if (newZoom < minZoom) {
      newZoom = minZoom;
    }
    if (Math.abs(newZoom - zoom) > 0.000001) {
      onZoomChange(newZoom);
    }
  });

  const handleRotate = useMemoizedFn((d) => {
    let newRotation = d === 'right' ? rotation + rotateStep : rotation - rotateStep;
    if (newRotation > 360) {
      newRotation = newRotation - 360;
    } else if (newRotation < 0) {
      newRotation = 360 + newRotation;
    }
    onRotationChange(newRotation);
  });

  React.useEffect(() => {
    const newValue = calculateAspectSliderValue(aspect);
    if (newValue !== value) {
      setValue(newValue);
    }
  }, [ aspect ]);

  React.useEffect(() => {
    update();
  }, [ width ]);
  return (
    <Box
      sx={{
        margin: 'auto',
        width,
      }}
    >
      { showZoomToolbar && (
        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
          sx={{
            mr: 1,
            mb: 2.5,
          }}
        >
          <Box
            sx={{
              cursor: zoom === minZoom ? 'not-allowed' : 'pointer',
            }}
            role='button'
            onClick={() => handleZoom('out')}
          >
            <IconZoomOut
              color={zoom === minZoom ? 'grey' : '#096dd9'}
            />
          </Box>
          <Slider
            min={minZoom}
            max={maxZoom}
            step={zoomStep}
            value={zoom}
            marks={[
              { value: minZoom, label: `${Math.round(minZoom * 100)}%` },
              { value: maxZoom, label: `${Math.round(maxZoom * 100)}%` },
            ]}
            // @ts-ignore
            onChange={(e, v) => onZoomChange(v)}
            valueLabelDisplay='auto'
            valueLabelFormat={(v) => `${Math.round(v * 100)}%`}
          />
          <Box
            sx={{
              cursor: zoom === maxZoom ? 'not-allowed' : 'pointer',
            }}
            role='button'
            onClick={() => handleZoom('in')}
          >
            <IconZoomIn
              color={zoom === maxZoom ? 'grey' : '#096dd9'}
            />
          </Box>
        </Stack>
      )}
      { showRotateToolbar && (
        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
          sx={{
            mr: 1,
            mb: 2.5,
          }}
        >
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => handleRotate('right')}
          >
            <IconRotateClockwise2
              color='#096dd9'
              transform='rotate(-90,0,0)'
            />
          </Box>
          <Slider
            min={0}
            max={360}
            step={rotateStep}
            value={rotation}
            // @ts-ignore
            onChange={(e, v) => onRotationChange(v)}
            marks={[
              { value: 0, label: '0°' },
              { value: 90, label: '90°' },
              { value: 180, label: '180°' },
              { value: 270, label: '270°' },
              { value: 360, label: '360°' },
            ]}
            valueLabelDisplay='auto'
            valueLabelFormat={(v) => `${v}°`}
          />
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => handleRotate('left')}
          >
            <IconRotate2
              color='#096dd9'
              transform='rotate(90,0,0)'
            />
          </Box>
        </Stack>
      )}
      { showAspectToolbar && aspectMarks.length && (
        <Stack
          direction='row'
          alignItems='center'
          spacing={2}
          sx={{ mr: 1, mb: 3 }}
        >
          <Box>
            <IconAspectRatio
              color='#096dd9'
            />
          </Box>
          <Slider
            value={value}
            {...aspectProps}
            onChange={onChange}
            valueLabelDisplay='auto'
          />
          <Box>
            <IconAspectRatio
              color='#096dd9'
              transform='rotate(90,0,0)'
            />
          </Box>
        </Stack>
      )}
    </Box>
  );
};

ToolbarRender.displayName = 'iimm.Mui.ImageCrop.CropDialog.DefaultToolbarRender';
