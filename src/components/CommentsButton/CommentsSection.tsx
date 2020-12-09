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
import { SpeakerIcon } from '../SVG/SpeakerIcon';
const { width, height } = RN.Dimensions.get('screen');

const FlatList = Animated.createAnimatedComponent(RN.FlatList);

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

  React.useEffect(() => {
    openAnim();
  }, []);

  return (
    <>
      <SpeakerIcon
        onPress={() => {
          if (isOpen) {
            closeAnim();
          } else {
            openAnim();
          }

          toggleComments();
        }}
      />

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

            <FlatList
              ref={animRef}
              data={Array.from({ length: 30 }).map((_, i) => i)}
              keyExtractor={(item) => String(item)}
              renderItem={(item) => (
                <CommentsItem
                  key={item.index}
                  showReply={item.index === 1}
                  comment="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit quia ipsam reiciendis, omnis rerum numquam fugiat."
                  profileSource={require('../../assets/img/profile.jpg')}
                  timestamp="12h"
                  title="reime005"
                />
              )}
              onContentSizeChange={(_, h) => (contentHeight.value = h)}
              scrollEnabled={false}
              scrollEventThrottle={16}
            />
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
