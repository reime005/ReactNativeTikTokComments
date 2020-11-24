import React from 'react';
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';
import { HeartEmptyIcon } from '../SVG/HeartEmptyIcon';
import { HeartFilledIcon } from '../SVG/HeartFilledIcon';

export const Heart = () => {
  const ref = React.useRef<TransitioningView | null>(null);

  const onPress = () => {
    ref.current?.animateNextTransition();
  };

  return (
    <Transitioning.View ref={ref} transition={transition}>
      <HeartEmptyIcon onPress={onPress} />
      <HeartFilledIcon onPress={onPress} />
    </Transitioning.View>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out type="fade" durationMs={150} />
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="fade" durationMs={150} delayMs={150} />
  </Transition.Together>
);
