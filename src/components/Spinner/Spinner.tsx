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

const SPEED_FACTOR = 0.2;
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
}

const defaultProps: SpinnerProps = {
  backgroundColor: '#303030',
  firstColor: 'rgb(235, 91, 93)',
  secondColor: 'rgb(91, 232, 235)',
  speedMS: 1000,
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
      [-1, -0.65, 0, 0.65, 1],
      [RADIUS * 1, RADIUS * 1.1, RADIUS * 1.3, RADIUS * 1.1, RADIUS * 1],
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
      height={80}
      width={130}
      {...props}
      viewBox="0 0 130 80"
      style={{ backgroundColor: props.backgroundColor, alignSelf: 'center' }}>
      <Defs>
        <ClipPath id="clip">
          <Circle cx={RADIUS} cy={RADIUS * 1.3} animatedProps={firstProps3} />
          <Circle cx={RADIUS} cy={RADIUS * 1.3} animatedProps={secondProps} />
        </ClipPath>
      </Defs>

      <Circle
        cy={RADIUS * 1.3}
        fill={props.firstColor}
        animatedProps={secondProps2}
      />

      <Circle
        cy={RADIUS * 1.3}
        fill={props.backgroundColor}
        animatedProps={firstProps2}
      />

      <Circle
        cy={RADIUS * 1.3}
        fill={props.secondColor}
        clipPath="url(#clip)"
        animatedProps={firstProps}
      />
    </Svg>
  );
};
