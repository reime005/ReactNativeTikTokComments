import React from 'react';
import { useTheme } from 'styled-components';
import SVG from '../../assets/svg/heart-empty.svg';
import { SVGWrapperProps } from './svgProps';
import { SVGWrapper } from './SVGWrapper';

export const HeartEmptyIcon = (props: SVGWrapperProps) => {
  const { secondaryFont } = useTheme();
  return <SVGWrapper {...props} SVG={SVG} fill={secondaryFont} />;
};
