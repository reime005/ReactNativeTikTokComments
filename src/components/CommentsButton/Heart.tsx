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
  const [toggled, setToggled] = React.useState(false);

  const toggle = () => setToggled(!toggled);

  const onPress = () => {
    toggle();
    ref.current?.animateNextTransition();
  };

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {!toggled ? (
        <HeartEmptyIcon onPress={onPress} />
      ) : (
        <HeartFilledIcon onPress={onPress} />
      )}
    </Transitioning.View>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out type="scale" durationMs={100} />
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="scale" durationMs={100} delayMs={50} />
  </Transition.Together>
);
