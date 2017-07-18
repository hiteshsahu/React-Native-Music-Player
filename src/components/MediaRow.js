import React, { Component } from 'react';
import Style from '../Style';
import { StackNavigator } from 'react-navigation';
import { AppRegistry,
  Image,Text ,
  View,
  TouchableOpacity} from 'react-native';

export default  class MovieRow extends Component {

  constructor(props) {
     super(props);
  }

  render({onPress} = this.props) {
  const { navigate } = this.props.navigation;
    return (

      <TouchableOpacity
            onPress={() => navigate('Detail',
              {   Song : this.props.Song,
                  Artist: this.props.Artist,
                  Album : this.props.Album ,
                  AlbumArt : this.props.AlbumArt
                }
              )}
              activeOpacity={0.7}
      >

    <View   style={Style.list_container}>

      <View style={Style.list_image_thumb}><Image source={{uri:this.props.AlbumArt}} style={{width: 100, height: 100}}></Image></View>

        <View  style={Style.list_items}>
        <Text  style={Style.heading_blue}  numberOfLines={1}>{this.props.Song}{"\n"}</Text>
        <Text  style={Style.meta_data_list} numberOfLines={1}>{this.props.Artist}</Text>
        <Text  style={Style.meta_data_list} numberOfLines={1}>{this.props.Album}</Text></View>

  </View>
   </TouchableOpacity>

    );
  }
}

AppRegistry.registerComponent('MovieRow', () => MovieRow);
