import React, { Component } from 'react'
import Style from '../Style';
import {
   View,
   WebView,
   StyleSheet
} from 'react-native'

export default class WebPageLoader extends Component  {
  render() {
   return (
      <View >
         <WebView
            source = {{ uri: 'https://hiteshsahu.com' }}
         />
      </View>
   );
}
}
