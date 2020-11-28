import React from 'react';
import { useTheme } from 'styled-components';
import SVG from '../../assets/svg/speaker.svg';
import { SVGWrapperProps } from './svgProps';
import { SVGWrapper } from './SVGWrapper';

export const SpeakerIcon = (props: SVGWrapperProps) => {
  const { secondaryFont } = useTheme();
  return <SVGWrapper fill={secondaryFont} {...props} SVG={SVG} />;
};
