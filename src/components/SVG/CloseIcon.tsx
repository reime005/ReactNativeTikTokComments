import React from 'react';
import { useTheme } from 'styled-components';
import Animated from 'react-native-reanimated';
import SVG from '../../assets/svg/cross.svg';

import {
  SVGWrapperProps,
  defaultSVGProps,
  transformSVGProps,
} from './svgProps';

export const CloseIcon = (props: SVGWrapperProps) => {
  const theme = useTheme();

  return (
    <SVG
      style={{}}
      {...{
        ...transformSVGProps({ ...defaultSVGProps, ...props }),
        fill: 'white',
        ...props,
      }}
    />
  );
};
