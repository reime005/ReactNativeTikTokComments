import React from 'react';
import SVG from '../../assets/svg/cross.svg';
import { SVGWrapperProps } from './svgProps';
import { SVGWrapper } from './SVGWrapper';

export const CloseIcon = (props: SVGWrapperProps) => {
  return <SVGWrapper {...props} SVG={SVG} />;
};
