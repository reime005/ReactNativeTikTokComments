import React from 'react';
import SVG from '../../assets/svg/chevron-left.svg';
import { SVGWrapperProps } from './svgProps';
import { SVGWrapper } from './SVGWrapper';

export const ChevronIcon = (props: SVGWrapperProps) => {
  return <SVGWrapper {...props} SVG={SVG} fill="transparent" />;
};
