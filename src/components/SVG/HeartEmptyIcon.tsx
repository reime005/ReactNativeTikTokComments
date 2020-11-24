import React from 'react';
import SVG from '../../assets/svg/heart-empty.svg';
import { SVGWrapperProps } from './svgProps';
import { SVGWrapper } from './SVGWrapper';

export const HeartEmptyIcon = (props: SVGWrapperProps) => {
  return <SVGWrapper {...props} SVG={SVG} fill="black" />;
};
