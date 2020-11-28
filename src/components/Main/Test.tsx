import React from 'react';

import MaskedView from '@react-native-masked-view/masked-view';
import { View, Text } from 'react-native';

export const Test = () => {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <MaskedView
        style={{
          backgroundColor: 'red',
          width: 200,
          height: 200
        }}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'black',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 180,
                height: 180,
                borderRadius: 40,
                borderWidth: 2,
                borderColor: 'black',
                backgroundColor: 'green',
              }}
            />
          </View>
        }>
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <Circle backgroundColor="rgba(91, 232, 235, .5)" />
        <Circle backgroundColor="rgba(235, 91, 93, .5)" />
      </MaskedView>
    </View>
  );
};

const Circle = (props: any) => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: props.backgroundColor,
    }}
  />
);
