import React from 'react';
import SVG from '../../assets/svg/home.svg';
import { SVGWrapperProps } from './svgProps';
import { SVGWrapper } from './SVGWrapper';

export const HomeIcon = (props: SVGWrapperProps) => {
  return <SVGWrapper {...props} SVG={SVG} />;
};
