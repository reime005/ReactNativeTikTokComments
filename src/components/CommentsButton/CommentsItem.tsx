import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { HeartEmptyIcon } from '../SVG/HeartEmptyIcon';
import { HeartFilledIcon } from '../SVG/HeartFilledIcon';
import * as S from './Comments.styled';
import { CommentsReply } from './CommentsReply';
import { ToggleIcon } from './ToggleIcon';

interface Props {
  title: string;
  comment: string;
  timestamp: string;
  profileSource: ImageSourcePropType;
  showReply?: boolean;
}

export const CommentsItem = (props: Props) => {
  const { title, comment, profileSource, timestamp, showReply } = props;

  return (
    <>
      <S.StyledCommentsItem>
        <S.StyledCommentsItemEdgeContainer>
          <S.StyledCommentsItemImage source={profileSource} />
        </S.StyledCommentsItemEdgeContainer>

        <S.StyledCommentsItemTextContainer>
          <S.StyledCommentsItemTextSecondary>
            {title}
          </S.StyledCommentsItemTextSecondary>

          <S.StyledCommentsItemTextPrimary>
            {comment}
            <S.StyledCommentsItemTextSecondary>
              &nbsp;{timestamp}
            </S.StyledCommentsItemTextSecondary>
          </S.StyledCommentsItemTextPrimary>
        </S.StyledCommentsItemTextContainer>

        <S.StyledCommentsItemEdgeContainer style={{ alignItems: 'center' }}>
          <ToggleIcon First={HeartEmptyIcon} Second={HeartFilledIcon} />
          <S.StyledCommentsItemTextCompact numberOfLines={1}>
            5
          </S.StyledCommentsItemTextCompact>
        </S.StyledCommentsItemEdgeContainer>
      </S.StyledCommentsItem>

      {showReply && (
        <S.StyledCommentsItem>
          <S.StyledCommentsItemEdgeContainer />

          <S.StyledCommentsItemTextContainer style={{ marginRight: 0 }}>
            <CommentsReply />
          </S.StyledCommentsItemTextContainer>
        </S.StyledCommentsItem>
      )}
    </>
  );
};
