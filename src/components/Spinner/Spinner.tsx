import React from 'react';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Defs, Circle as C, ClipPath, G } from 'react-native-svg';

const Circle = Animated.createAnimatedComponent(C);

const SVG_HEIGHT = 80;
const SVG_WIDTH = 130;
const RADIUS = 30;

const initialPositions = {
  first: RADIUS + RADIUS * 0.2,
  second: RADIUS * 3 + RADIUS * 0.2,
};

interface SpinnerProps {
  backgroundColor?: string;
  firstColor?: string;
  secondColor?: string;
  speedMS?: number;
  height?: number;
}

const defaultProps: SpinnerProps = {
  backgroundColor: '#303030',
  firstColor: 'rgb(235, 91, 93)',
  secondColor: 'rgb(91, 232, 235)',
  speedMS: 1000,
  height: SVG_HEIGHT,
};

export const Spinner = (p: SpinnerProps) => {
  const props = { ...defaultProps, ...p };

  const currTime = useSharedValue(1);

  const x = {
    first: useSharedValue(initialPositions.first),
    second: useSharedValue(initialPositions.second),
  };

  const radius = {
    first: useSharedValue(RADIUS),
    second: useSharedValue(RADIUS),
  };

  React.useEffect(() => {
    currTime.value = withRepeat(
      withSequence(
        withTiming(-1, { duration: props.speedMS }),
        withTiming(1, { duration: props.speedMS }),
      ),
      -1,
    );
  }, []);

  const secondProps = useAnimatedProps(() => {
    const s = Math.sin(currTime.value);

    x.second.value = interpolate(
      s,
      [1, -1],
      [initialPositions.first, initialPositions.second],
    );

    radius.second.value = interpolate(
      s,
      [-1, -0.6, 0, 0.6, 1],
      [RADIUS * 1, RADIUS * 0.6, RADIUS * 0.4, RADIUS * 0.6, RADIUS * 1],
    );

    return {
      cx: x.second.value,
      r: radius.second.value,
    };
  });

  const secondProps2 = useAnimatedProps(() => {
    return {
      cx: x.second.value,
      r: radius.second.value,
    };
  });

  const firstProps = useAnimatedProps(() => {
    const s = Math.sin(currTime.value);

    x.first.value = interpolate(
      s,
      [-1, 1],
      [initialPositions.first, initialPositions.second],
    );

    radius.first.value = interpolate(
      s,
      [-1, -0.6, 0, 0.6, 1],
      [RADIUS * 0.8, RADIUS * 1, RADIUS * 1.2, RADIUS * 1, RADIUS * 0.8],
    );

    return {
      cx: x.first.value,
      r: radius.first.value,
    };
  });

  const firstProps2 = useAnimatedProps(() => {
    return {
      cx: x.first.value,
      r: radius.first.value,
    };
  });

  const firstProps3 = useAnimatedProps(() => {
    return {
      cx: x.first.value,
      r: radius.first.value,
    };
  });

  return (
    <Svg
      height={props.height}
      width={
        SVG_WIDTH *
        ((props.height || SVG_HEIGHT) / (defaultProps.height || SVG_HEIGHT))
      }
      {...props}
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      style={{ backgroundColor: props.backgroundColor, alignSelf: 'center' }}>
      <Defs>
        <ClipPath id="clip">
          <G opacity="0">
            <Circle cx={RADIUS} cy="40" animatedProps={firstProps3} />
            <Circle cx={RADIUS} cy="40" animatedProps={secondProps} />
          </G>
        </ClipPath>
      </Defs>

      <Circle cy="40" fill={props.firstColor} animatedProps={secondProps2} />

      <Circle
        cy="40"
        fill={props.backgroundColor}
        animatedProps={firstProps2}
      />

      <Circle
        cy="40"
        fill={props.secondColor}
        clipPath="url(#clip)"
        animatedProps={firstProps}
      />
    </Svg>
  );
};
