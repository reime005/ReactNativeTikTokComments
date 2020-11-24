import React from 'react';
import SVG from '../../assets/svg/heart-filled.svg';
import { SVGWrapperProps } from './svgProps';
import { SVGWrapper } from './SVGWrapper';

export const HeartFilledIcon = (props: SVGWrapperProps) => {
  return <SVGWrapper {...props} SVG={SVG} fill="red" />;
};
