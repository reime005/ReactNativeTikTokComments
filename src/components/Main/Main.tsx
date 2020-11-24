import * as React from 'react';
import { useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '../../config/theme';
import { CommentsSection } from '../CommentsButton/CommentsSection';

export const Main = () => {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      <ThemeProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <CommentsSection />
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};
