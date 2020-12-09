import { Dimensions } from 'react-native';
import Animated, {
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useCommentsButton } from './useCommentsButton';

const { height } = Dimensions.get('screen');

const springConfig: Animated.WithSpringConfig = {
  velocity: 8,
  damping: 80,
  stiffness: 300,
};

const BOTTOM_MIN = -(height * 2);
const BOTTOM_MAX = 0;

export const useCommentsSection = () => {
  const { isOpen, toggleComments, setIsOpen } = useCommentsButton();

  const animRef = useAnimatedRef<Animated.ScrollView>();

  const bottom = useSharedValue(BOTTOM_MIN);

  const contentHeight = useSharedValue(0);
  const scrollOffset = useSharedValue(0);
  const scrollOffsetEnd = useSharedValue(0);

  const closeAnim = () => {
    'worklet';
    bottom.value = withSpring(BOTTOM_MIN, springConfig, () => {
      runOnJS(setIsOpen)(false);
    });
  };

  const openAnim = () => {
    'worklet';
    bottom.value = withSpring(BOTTOM_MAX, springConfig, () => {
      runOnJS(setIsOpen)(true);
    });
  };

  function handleDragEndEvent() {
    'worklet';

    if (bottom.value > BOTTOM_MAX - 250) {
      openAnim();
    } else {
      closeAnim();
    }
  }

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (evt, ctx: { originY: number }) => {
      let diff = evt.y - ctx.originY;

      if (scrollOffset.value < 1 && evt.velocityY > 0) {
        diff *= 1;

        bottom.value = bottom.value - diff;
      } else {
        let newVal = scrollOffset.value + (-1 * evt.velocityY) / 30;

        if (newVal < 0) {
          newVal = 0;
        } else if (newVal > contentHeight.value) {
          newVal = contentHeight.value;
        }

        scrollOffset.value = newVal;

        return;
      }
    },
    onEnd: function () {
      handleDragEndEvent();
    },
    onStart: (evt, ctx) => {
      ctx.originY = evt.y;
    },
  });

  const animStyle = useAnimatedStyle(() => {
    return {
      bottom: bottom.value,
    };
  });

  useDerivedValue<any>(() => {
    scrollTo(animRef, 0, scrollOffsetEnd.value, true);
  });

  useDerivedValue<any>(() => {
    scrollTo(animRef, 0, scrollOffset.value, false);
  });

  return {
    animStyle,
    gestureHandler,
    contentHeight,
    openAnim,
    closeAnim,
    isOpen,
    toggleComments,
    animRef,
  };
};
