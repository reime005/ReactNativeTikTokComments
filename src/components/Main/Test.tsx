import React from 'react';

import MaskedView from '@react-native-masked-view/masked-view';
import Svg, {
  Text,
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Polygon,
  RadialGradient,
  Rect,
  Stop,
} from 'react-native-svg';

export const Test = () => {
  return (
    <Svg height="100%" width="100%" style={{ backgroundColor: '#000' }}>
      {/* <Circle x="30" cx="30" cy="30" r="40" fill="red" /> */}

      <Defs>
        {/* <RadialGradient
          id="grad"
          cx="50%"
          cy="50%"
          rx="50%"
          ry="50%"
          fx="50%"
          fy="50%"
          gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#ff0" stopOpacity="1" />
          <Stop offset="100%" stopColor="#00f" stopOpacity="1" />
        </RadialGradient> */}
        <ClipPath id="clip">
          {/* <G scale="0.9" x="10"> */}
          {/* <Circle x="50" cx="30" cy="30" r="10" />
          <Circle x="50" cx="30" cy="30" r="30" /> */}
          {/* <Rect x="0" y="0" width="100%" height="100%" fill="yellow" /> */}
          <Circle x="30" cx="30" cy="30" r="115" fill="green" />
          {/* <Circle x="25" cx="30" cy="30" r="30" fill="green" />
          <Circle x="30" cx="30" cy="30" r="45" fill="grey" /> */}

          {/* </G> */}
        </ClipPath>
      </Defs>
      {/* <Rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="red"
      /> */}
      {/* <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="blue"
        clipPath="url(#clip)"
      /> */}
      {/* <Circle x="50" cx="30" cy="30" r="30" fill="green" /> */}

      {/* <Circle
        x="40"
        cx="30"
        cy="30"
        r="30"
        fill="green"
        clipPath="url(#clip)"
      /> */}


      <Circle
        x="50"
        cx="30"
        cy="30"
        r="60"
        fill="yellow"
        clipPath="url(#clip)"
      />

      {/* <Circle x="60" cx="30" cy="30" r="15" fill="red" /> */}
    </Svg>
  );
};

// export const Test = () => {
//   return (
//     <View style={{ flex: 1, width: '100%' }}>
//       <MaskedView
//         style={{
//           backgroundColor: 'red',
//           width: 200,
//           height: 200
//         }}
//         maskElement={
//           <View
//             style={{
//               // Transparent background because mask is based off alpha channel.
//               backgroundColor: 'black',
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <View
//               style={{
//                 width: 180,
//                 height: 180,
//                 borderRadius: 40,
//                 borderWidth: 2,
//                 borderColor: 'black',
//                 backgroundColor: 'green',
//               }}
//             />
//           </View>
//         }>
//         {/* Shows behind the mask, you can put anything here, such as an image */}
//         <Circle backgroundColor="rgba(91, 232, 235, .5)" />
//         <Circle backgroundColor="rgba(235, 91, 93, .5)" />
//       </MaskedView>
//     </View>
//   );
// };

// const Circle = (props: any) => (
//   <View
//     style={{
//       position: 'absolute',
//       top: 0,
//       width: 80,
//       height: 80,
//       borderRadius: 40,
//       backgroundColor: props.backgroundColor,
//     }}
//   />
// );
