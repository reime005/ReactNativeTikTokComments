import { ViewStyle } from 'react-native';

interface DefaultSVGWrapperProps {
  width?: number;
  height?: number;
  scale?: number;
  fill?: string;
  color?: string;
  SVG?: React.ElementType<DefaultSVGWrapperProps>;
}

const defaultSVGProps: DefaultSVGWrapperProps = {
  width: 24,
  height: 24,
  scale: 1,
  fill: 'grey',
  color: '#000',
  SVG: undefined,
};

export interface SVGWrapperProps
  extends DefaultSVGWrapperProps,
    TransformProps {
  onPress?: () => void;
  outerStyle?: ViewStyle;
  activeOpacity?: number;
}

interface TransformProps {
  rotateByDeg?: number;
}

export const transformSVGProps = (props: SVGWrapperProps) => ({
  ...defaultSVGProps,
  ...props,
  width:
    (props.width || defaultSVGProps.width || 1) *
    (props.scale || defaultSVGProps.scale || 1),
  height:
    (props.height || defaultSVGProps.height || 1) *
    (props.scale || defaultSVGProps.scale || 1),
});
