import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';

import { SVGWrapperProps, transformSVGProps } from './svgProps';

export const SVGWrapper = (props: SVGWrapperProps) => {
  const theme = useTheme();

  const { SVG } = props;

  if (!SVG) {
    return null;
  }

  const outerStyle = props.outerStyle || {};

  const transformedProps = transformSVGProps(props);

  const outerProps: TouchableOpacityProps = {
    activeOpacity: 1,
    style: {
      ...{
        ...(props.rotateByDeg
          ? {
              transform: [
                {
                  rotate: `${props.rotateByDeg}deg`,
                },
              ],
              alignItems: 'center',
              justifyContent: 'center',
            }
          : {}),
      },
      ...outerStyle,
    },
    ...props,
  };

  return (
    <TouchableOpacity {...outerProps}>
      <SVG
        {...{
          fill: theme.primaryColor,
          ...transformedProps,
        }}
      />
    </TouchableOpacity>
  );
};
