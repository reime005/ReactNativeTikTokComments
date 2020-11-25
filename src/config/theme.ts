import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
    searchBackgroundColor: string;
    focusedIconColor: string;
    unFocusedIconColor: string;
    mainFont: string;
    secondaryFont: string;
  }
}

export const lightTheme: DefaultTheme = {
  primaryColor: 'rgb(127, 90, 240)',
  focusedIconColor: '#ff884d',
  unFocusedIconColor: '#cccccc',
  secondaryColor: '#666',
  searchBackgroundColor: '#fafafa',
  mainFont: '#090909',
  secondaryFont: '#9d9d9f',
};

export const darkTheme: DefaultTheme = {
  primaryColor: 'rgb(127, 90, 240)',
  focusedIconColor: '#ff884d',
  unFocusedIconColor: '#cccccc',
  secondaryColor: '#cacaca',
  searchBackgroundColor: '#707070',
  mainFont: '#efefef',
  secondaryFont: '#9d9d9f',
};
