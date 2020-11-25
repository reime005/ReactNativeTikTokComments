import React from 'react';
import { HeartEmptyIcon } from '../SVG/HeartEmptyIcon';
import { HeartFilledIcon } from '../SVG/HeartFilledIcon';
import * as S from './Comments.styled';
import { ToggleIcon } from './ToggleIcon';

interface Props {}

export const CommentsItem = (props: Props) => {
  return (
    <S.StyledCommentsItem>
      <S.StyledCommentsItemEdgeContainer>
        <S.StyledCommentsItemImage
          source={require('../../assets/img/profile.jpg')}
        />
      </S.StyledCommentsItemEdgeContainer>

      <S.StyledCommentsItemTextContainer>
        <S.StyledCommentsItemTextSecondary>
          Title
        </S.StyledCommentsItemTextSecondary>

        <S.StyledCommentsItemTextPrimary>
        Secondary test test Secondary test test Secondary test test Secondary test test Secondary test test
          <S.StyledCommentsItemTextSecondary>
            &nbsp;12h
          </S.StyledCommentsItemTextSecondary>
        </S.StyledCommentsItemTextPrimary>
      </S.StyledCommentsItemTextContainer>

      <S.StyledCommentsItemEdgeContainer style={{ alignItems: 'center' }}>
        <ToggleIcon First={HeartEmptyIcon} Second={HeartFilledIcon} />
        <S.StyledCommentsItemTextCompact numberOfLines={1}>
          42
        </S.StyledCommentsItemTextCompact>
      </S.StyledCommentsItemEdgeContainer>
    </S.StyledCommentsItem>
  );
};
