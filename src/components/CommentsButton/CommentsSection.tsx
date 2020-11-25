import React from 'react';
import * as RN from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { HomeIcon } from '../SVG/HomeIcon';
import { CloseIcon } from '../SVG/CloseIcon';
import { useCommentsSection } from './useCommentsSection';
import { ChevronIcon } from '../SVG/ChevronIcon';
import { HeartFilledIcon } from '../SVG/HeartFilledIcon';
import { HeartEmptyIcon } from '../SVG/HeartEmptyIcon';
import { ToggleIcon } from './ToggleIcon';
import { CommentsItem } from './CommentsItem';
import { Spinner } from '../Spinner/Spinner';
const { width, height } = RN.Dimensions.get('screen');

export const CommentsSection = () => {
  const {
    closeAnim,
    openAnim,
    isOpen,
    toggleComments,
    animStyle,
    gestureHandler,
    animRef,
    contentHeight,
  } = useCommentsSection();

  return (
    <>
      <ChevronIcon
        rotateByDeg={-90}
        onPress={() => {
          if (isOpen) {
            closeAnim();
          } else {
            openAnim();
          }

          toggleComments();
        }}
      />

        <Spinner />

      <Animated.View style={[styles.box, animStyle]}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={{ flex: 1 }}>
            <RN.View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 8,
                height: 30,
                marginBottom: 8,
              }}>
              <RN.View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <RN.Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 14,
                    lineHeight: 14,
                    color: 'white',
                  }}>
                  253 comments
                </RN.Text>
              </RN.View>

              <CloseIcon
                width={22}
                height={22}
                fill="#fff"
                onPress={closeAnim}
                activeOpacity={0.8}
              />
            </RN.View>

            <Animated.ScrollView
              ref={animRef}
              onContentSizeChange={(_, h) => (contentHeight.value = h)}
              scrollEnabled={false}
              scrollEventThrottle={16}>
              {Array.from({ length: 250 }).map((_, i) => (
                <CommentsItem key={i} />
              ))}
            </Animated.ScrollView>
          </Animated.View>
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
    backgroundColor: '#303030',
    height: height * 0.65,
    zIndex: 1000,
  },
});
