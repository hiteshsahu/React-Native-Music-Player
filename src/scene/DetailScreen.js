import Style from '../Style';
import React from 'react';
import {
  AppRegistry,
  Text,View,Button,Image,ScrollView,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class MediaDetail extends React.Component {

  //Tollbar title
  // static navigationOptions = {
  //   title: 'Song Detail',
  // };

  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    title: 'SONG DETAIL',//`${navigation.state.params.Song}`,
  });
  render() {

    // The screen's current route is passed in to `props.navigation.state`:
   const { params } = this.props.navigation.state;

    return (
      <View style={Style.containerDetail}>
      <Image source={{uri: params.AlbumArt}} style={Style.imageBackground}>
      <ScrollView  style={Style.plot}>

        <Text style={Style.song_title} >{params.Song}</Text>
        <Text style={Style.meta_data}>Artist : {params.Artist}</Text>
        <Text style={Style.meta_data}>Album : {params.Album}</Text>

        </ScrollView>
        </Image>
      </View>
    );
  }
}
AppRegistry.registerComponent('DetailScreen', () => MediaDetail);
