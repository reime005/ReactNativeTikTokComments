import React from 'react';
import { View } from 'react-native';
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { Spinner } from '../Spinner/Spinner';
import { ChevronIcon } from '../SVG/ChevronIcon';
import { SVGWrapperProps } from '../SVG/svgProps';
import { StyledCommentsItemTextSecondary } from './Comments.styled';

import * as S from './CommentsReply.styled';

interface Props {}

export const CommentsReply = () => {
  const ref = React.useRef<TransitioningView | null>(null);

  const [isLoading, setIsLoading] = React.useState(true);

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
    <Transitioning.View ref={ref} transition={transition}>
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
        width: '100%',
        height: 250,
      }}>
      <S.StyledCommentsReplyHeader
        style={{ width: '100%' }}
        activeOpacity={0.9}
        onPress={props.onPress}>
        <StyledCommentsItemTextSecondary>
          View replies (42) <ChevronIcon rotateByDeg={90} />
        </StyledCommentsItemTextSecondary>
      </S.StyledCommentsReplyHeader>
    </View>
  );
};

const ViewReply = (props: ViewReplyProps) => {
  const theme = useTheme();

  return (
    <S.StyledCommentsReplyHeader activeOpacity={0.9} onPress={props.onPress}>
      <StyledCommentsItemTextSecondary>
        View replies (42) <ChevronIcon rotateByDeg={-90} />
      </StyledCommentsItemTextSecondary>

      {props.isLoading && <Spinner />}
    </S.StyledCommentsReplyHeader>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out type="scale" durationMs={100} />
    <Transition.Change interpolation="linear" />
    <Transition.In type="fade" durationMs={100} delayMs={50} />
  </Transition.Together>
);
