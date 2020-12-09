import React from 'react';
import { useTheme } from 'styled-components';
import SVG from '../../assets/svg/chevron-left.svg';
import { SVGWrapperProps } from './svgProps';
import { SVGWrapper } from './SVGWrapper';

export const ChevronIcon = (props: SVGWrapperProps) => {
  const { secondaryFont } = useTheme();
  return (
    <SVGWrapper fill="transparent" color={secondaryFont} {...props} SVG={SVG} />
  );
};
