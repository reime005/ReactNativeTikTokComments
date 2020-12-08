import React from 'react';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, { Defs, Circle as C, ClipPath, G } from 'react-native-svg';

const Circle = Animated.createAnimatedComponent(C);

const SPEED_FACTOR = 0.05;
const RADIUS = 30;

const initialPositions = {
  first: RADIUS + RADIUS * 0.2,
  second: RADIUS * 3 + RADIUS * 0.2,
};

export const ClipTest = (props: any) => {
  const frameRef = React.useRef<any>(null);
  const currTime = useSharedValue(0);
  const x = {
    first: useSharedValue(initialPositions.first),
    second: useSharedValue(initialPositions.second),
  };
  const radius = {
    first: useSharedValue(RADIUS),
    second: useSharedValue(RADIUS),
  };

  const req = React.useCallback(() => {
    currTime.value = currTime.value + SPEED_FACTOR;

    frameRef.current = requestAnimationFrame(req);
  }, [currTime]);

  React.useEffect(() => {
    req();

    return () => cancelAnimationFrame(frameRef.current);
  }, [req]);

  const secondProps = useAnimatedProps(() => {
    const s = Math.sin(currTime.value);

    x.second.value = interpolate(
      s,
      [1, -1],
      [initialPositions.first, initialPositions.second],
    );

    radius.second.value = interpolate(
      s,
      [-1, -0.5, 0, 0.5, 1],
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
      [-1, -0.7, 0, 0.7, 1],
      [RADIUS * 1, RADIUS * 1, RADIUS * 1.2, RADIUS * 1, RADIUS * 1],
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
      height={100}
      width={150}
      {...props}
      viewBox="0 0 130 80"
      style={{ backgroundColor: '#000', alignSelf: 'center' }}>
      <Defs>
        <ClipPath id="clip">
          <G opacity="0">
            <Circle cx="30" cy="40" r="30" animatedProps={firstProps3} />
            <Circle cx="30" cy="40" r="10" animatedProps={secondProps} />
          </G>
        </ClipPath>
      </Defs>

      <Circle
        cy="40"
        r="10"
        fill="rgb(235, 91, 93)"
        animatedProps={secondProps2}
      />

      <Circle cy="40" r="30" fill="#000" animatedProps={firstProps2} />

      <Circle
        cy="40"
        r="30"
        fill="rgb(91, 232, 235)"
        clipPath="url(#clip)"
        animatedProps={firstProps}
      />
    </Svg>
  );
};
