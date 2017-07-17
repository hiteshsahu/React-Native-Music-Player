import React, { Component } from 'react';
import Style from '../Style';
import { StackNavigator } from 'react-navigation';
import { AppRegistry,
  Image,Text ,
  View,Dimensions,
  TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');
const gutter = 3; // You can add gutter if you want

export default  class MovieRow extends Component {

  constructor(props) {
     super(props);
  }

  render({onPress} = this.props) {

    return (

      <TouchableOpacity

              activeOpacity={0.7}
      >

    <View   style={Style.list_container}>

      <View style={Style.list_image_thumb}><Image source={{uri: 'https://cdn.traileraddict.com/content/paramount-pictures/ghost-in-the-shell-poster-8.jpg'}} style={{width: 100, height: 100}}></Image></View>

      <View   style={Style.list_items}>
        <Text  style={Style.heading_blue}  numberOfLines={2}>Love Me{"\n"}</Text>
        <Text  style={Style.meta_data_list}>Lucy</Text>
        <Text  style={Style.meta_data_list} numberOfLines={3}>LOVE</Text></View>

  </View>
   </TouchableOpacity>

    );
  }
}

AppRegistry.registerComponent('MovieRow', () => MovieRow);
