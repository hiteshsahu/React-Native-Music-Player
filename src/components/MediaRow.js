import React, { Component } from 'react';
import Style from '../Style';
import { StackNavigator } from 'react-navigation';
import { AppRegistry,
  Image,Text ,
  View,
  TouchableOpacity} from 'react-native';
import MusicPlayerModule from '../modules/MusicPlayerModule';

export default  class MovieRow extends Component {

  constructor(props) {
     super(props);
  }

//   /  / initially showDefault will be false
// var icon = this.state.showDefault ? require('../../../resource/default.png') : {uri: ImageUrl};


  render({onPress} = this.props) {
  const { navigate } = this.props.navigation;
    return (

      <TouchableOpacity
               onPress={() => MusicPlayerModule.playThisSong(this.props.songURL,this.props.Song , this.props.AlbumArt)}
              activeOpacity={0.7}
      >

    <View style={Style.list_container}>

      <View style={Style.list_image_thumb}>
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
      <Image source={{uri:this.props.AlbumArt}}
         defaultSource={require('../assets/img/place_holder.jpg')}
         style={{width: 100, height: 100}}></Image>
         </TouchableOpacity>
      </View>

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
