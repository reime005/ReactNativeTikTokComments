import React from 'react';
import { View, FlatList } from 'react-native';
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';
import { Spinner } from '../Spinner/Spinner';
import { ChevronIcon } from '../SVG/ChevronIcon';
import { StyledCommentsItemTextSecondary } from './Comments.styled';
import { CommentsItem } from './CommentsItem';

import * as S from './CommentsReply.styled';

interface Props {}

export const CommentsReply = () => {
  const ref = React.useRef<TransitioningView | null>(null);

  const [isLoading, setIsLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => setOpen(!open);

  const onPress = () => {
    if (!open) {
      //ref...
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        toggleOpen();
        ref.current?.animateNextTransition();
      }, 1000);
    } else {
      toggleOpen();
      ref.current?.animateNextTransition();
    }
  };

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={{ width: '100%' }}>
      {!open && <ViewReply onPress={onPress} isLoading={isLoading} />}
      {open && <ReplyItems onPress={onPress} isLoading={isLoading} />}
    </Transitioning.View>
  );
};

interface ClickProps {
  onPress: () => void;
}

interface ViewReplyProps extends ClickProps {
  isLoading: boolean;
}

const ReplyItems = (props: ViewReplyProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
      }}>
      <FlatList
        style={{ width: '100%' }}
        data={Array.from({ length: 5 }).map((_, i) => i)}
        keyExtractor={(item) => String(item)}
        renderItem={(item) => (
          <CommentsItem
            key={item.index}
            comment="I'm a reply to a comment"
            profileSource={require('../../assets/img/profile.jpg')}
            timestamp="5h"
            title="commentor"
          />
        )}
        scrollEnabled={false}
        scrollEventThrottle={16}
      />

      <S.StyledCommentsReplyHeader
        style={{ width: '100%' }}
        activeOpacity={0.9}
        onPress={props.onPress}>
        <StyledCommentsItemTextSecondary>
          Hide <ChevronIcon rotateByDeg={90} />
        </StyledCommentsItemTextSecondary>
      </S.StyledCommentsReplyHeader>
    </View>
  );
};

const ViewReply = (props: ViewReplyProps) => {
  return (
    <>
      <S.StyledCommentsReplyHeader activeOpacity={0.9} onPress={props.onPress}>
        <StyledCommentsItemTextSecondary>
          View replies (42)
        </StyledCommentsItemTextSecondary>

        <ChevronIcon rotateByDeg={-90} />
      </S.StyledCommentsReplyHeader>

      {props.isLoading && <Spinner height={20} />}
    </>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out type="scale" durationMs={100} />
    <Transition.Change interpolation="linear" />
    <Transition.In type="fade" durationMs={100} delayMs={50} />
  </Transition.Together>
);
