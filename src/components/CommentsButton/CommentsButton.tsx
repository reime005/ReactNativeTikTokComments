import React from 'react';
import * as RN from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  scrollTo,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';

import { HomeIcon } from '../SVG/HomeIcon';

const { width, height } = RN.Dimensions.get('screen');

const springConfig: Animated.WithSpringConfig = {
  velocity: 8,
  damping: 80,
  stiffness: 300,
};

const BOTTOM_MIN = -(height * 2);
const BOTTOM_MAX = 0;

export const CommentsButton = () => {
  const { isOpen, toggleComments, setIsOpen } = useCommentsButton();

  const animRef = useAnimatedRef<Animated.ScrollView>();

  const bottom = useSharedValue(BOTTOM_MIN);

  const scrollOffset = useSharedValue(0);
  const onEndDragged = useSharedValue(0);
  const animLock = useSharedValue(0);

  const closeAnim = () => {
    console.warn('close');

    animLock.value = 1;
    bottom.value = withSpring(BOTTOM_MIN, springConfig, () => {
      setIsOpen(false);
      animLock.value = 0;
    });
  };

  const openAnim = () => {
    console.warn('open');

    animLock.value = 1;
    bottom.value = withSpring(BOTTOM_MAX, springConfig, () => {
      setIsOpen(true);
      animLock.value = 0;
    });
  };

  const handleDragEndEvent = () => {
    if (bottom.value > BOTTOM_MAX - 250) {
      openAnim();
    } else {
      closeAnim();
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (evt, ctx) => {
      if (evt.velocityY < 1) {
        console.warn(evt.translationY);

        scrollOffset.value = + evt.y;
        return;
      }

      bottom.value = bottom.value - evt.y;
    },
    onEnd: (evt, ctx) => {
      handleDragEndEvent();
    },
    onStart: (evt, ctx) => {
      // console.warn('f');
    },
  });

  // const scrollHandler = useAnimatedScrollHandler((e) => {
  //   console.warn(e);

  // });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (animLock.value === 1) {
        return;
      }

      if (event.contentOffset.y <= 0) {
        console.warn('l');

        bottom.value = bottom.value + event.contentOffset.y / 2;
        return;
      }

      console.warn(event.contentOffset.y);

      scrollOffset.value = event.contentOffset.y;
    },
    onEndDrag: (evt) => {
      if (animLock.value === 1) {
        return;
      }

      console.warn('end');

      handleDragEndEvent();
    },
    // onMomentumBegin: () => {
    //   console.warn('mom');

    // }
    // onBeginDrag: (event, ctx) => {
    //   onEndDragged.value = 1;
    // },
    // onEndDrag: (event) => {
    //   onEndDragged.value = 0;
    // },
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
    };
  });

  const animProps = useAnimatedProps(() => {
    return {
      pointerEvents: onEndDragged.value === 1 ? 'box-only' : 'box-none',
    };
  });

  useDerivedValue(() => {
    scrollTo(animRef, 0, scrollOffset.value, false);
  });

  return (
    <>
      <RN.TouchableOpacity
        onPress={() => {
          if (isOpen) {
            closeAnim();
          } else {
            openAnim();
          }

          toggleComments();
        }}>
        <HomeIcon />
      </RN.TouchableOpacity>

      <Animated.View style={[styles.box, animStyle]}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.ScrollView
            ref={animRef}
            scrollEnabled={false}
            animatedProps={animProps}
            scrollEventThrottle={64}
            // alwaysBounceVertical={true}
            // bounces={false}
            onScroll={scrollHandler}>
            {Array.from({ length: 50 }).map(() => (
              <RN.Text>test</RN.Text>
            ))}
          </Animated.ScrollView>
        </PanGestureHandler>
      </Animated.View>
    </>
  );
};

const styles = RN.StyleSheet.create({
  box: {
    position: 'absolute',
    left: 0,
    width,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: 8,
    backgroundColor: 'grey',
    height: height * 0.65,
    zIndex: 1000,
  },
});

export const useCommentsButton = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleComments = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, toggleComments, setIsOpen };
};
