import React from 'react';
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Mask,
  Rect,
  Text,
  Use,
  Circle as C,
  RadialGradient,
  ClipPath,
  G,
  Ellipse,
  Polygon,
} from 'react-native-svg';
/**
 * 1/ circle black BG + clip
 * 2/ red circle
 * 3/ transparent bg
 */
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
  const x = { first: useSharedValue(15), second: useSharedValue(45) };
  const radius = { first: useSharedValue(30), second: useSharedValue(30) };

  const req = React.useCallback(() => {
    // x.second.value = radius * 2 + radius * Math.sin(currTime.value - 1);
    currTime.value = currTime.value + SPEED_FACTOR;

    frameRef.current = requestAnimationFrame(req);
  }, [x, currTime]);

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
      [RADIUS * 1, RADIUS * 0.8, RADIUS * 0.4, RADIUS * 0.8, RADIUS * 1],
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
      [RADIUS * 0.8, RADIUS * 0.9, RADIUS * 1.1, RADIUS * 0.9, RADIUS * 0.8],
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
      height={120}
      width={240}
      {...props}
      viewBox="0 0 120 60"
      style={{ backgroundColor: '#ccc', alignSelf: 'center' }}>
      <Defs>
        <ClipPath id="clip">
          <G opacity="0">
            <Circle cx="30" cy="30" r="30" animatedProps={firstProps3} />
            <Circle cx="30" cy="30" r="10" animatedProps={secondProps} />
          </G>
        </ClipPath>
      </Defs>

      <Circle
        cy="30"
        r="10"
        fill="rgb(235, 91, 93)"
        animatedProps={secondProps2}
      />

      <Circle cy="30" r="30" fill="#000" animatedProps={firstProps2} />

      <Circle
        cy="30"
        r="30"
        fill="rgb(91, 232, 235)"
        clipPath="url(#clip)"
        animatedProps={firstProps}
      />
    </Svg>
  );
};
