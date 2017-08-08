import React from 'react';
import Style from '../Style';
import {
  AppRegistry,Image,
  Text,View,Button,Alert, ToastAndroid,TouchableOpacity,Slider
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MovieRow from '../components/MediaRow';
import MediaList from '../components/MediaList'
import MusicPlayerModule from '../modules/MusicPlayerModule';
import { DeviceEventEmitter } from 'react-native';
import { StyleSheet ,Dimensions} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class HomeScreen extends React.Component {

  //Tollbar title
  static navigationOptions = {
    title: 'React Native Media Player',
    headerTintColor: 'black',

  };

  static defaultProps = {
   value: 0,
   songName:"Select a Song to Start Playing",
   albumArt: 'https://cdn.traileraddict.com/content/paramount-pictures/ghost-in-the-shell-poster-8.jpg',
   songDuration:0,
   seekTo: 0,
   };

   state = {
      value: this.props.value,
      songName: this.props.songName,
      albumArt: this.props.albumArt,
      songDuration: this.props.songDuration,
      seekTo: this.props.seekTo,
    };

    componentWillMount = () => {

        DeviceEventEmitter.addListener('UpdateProgress',(e: Event) => {
            // handle event.
          this.setState({
            value: e['SongProgress'],
            seekTo:e['seekTo'],
          });
        });

          DeviceEventEmitter.addListener('songChanged',(e: Event) => {
            // handle event.
          this.setState({
            songName:e['songName'],
            albumArt: e['albumARt'],
            songDuration:e['duration'],
            seekTo:e['seekTo'],
          });
        });
      }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Style.container}>

        <MediaList  style ={{ flex:1}} navigation={this.props.navigation}/>

        <View   style={Style.dashboard}>

            <View style={Style.dashboard_thumb}>
            <Image
             source={{uri: this.state.albumArt}}
             defaultSource={require('../assets/img/place_holder.jpg')}
             style={{width: 100, height: 100}}></Image>
            </View>
            <View  style={Style.list_items}>
            <Text  style={Style.dashboard_title}  numberOfLines={1}>{this.state.songName }</Text>

            <Slider
                  style = {Style.slider}
                  value={0 }
                  step={1}
                  value={this.state.seekTo}
                  minimumValue={0}
                  maximumValue={100}
                  minimumTrackTintColor={'#009688'}
                  maximumTrackTintColor={'#4caf50'}
                  onValueChange={(value) =>  MusicPlayerModule.seekTo(value)} />

            <View style= {{ flex: 1,flexDirection: 'row',justifyContent: 'space-between',width: width-125 ,margin:5}}>
              <Text  style={Style.slider_start}>{this.state.value}</Text>
              <Text  style = {Style.slider_value}>{this.state.songDuration}</Text>
            </View>
          </View>

      </View>

      <TouchableOpacity
              onPress={() => navigate('Detail',
                          {   Song : this.props.Song,
                              Artist: this.props.Artist,
                              Album : this.props.Album ,
                              AlbumArt : this.props.AlbumArt
                            }
                          )}
            style={{ backgroundColor: '#673ab7',
                      borderWidth:1,
                      borderColor:'rgba(0,0,0,0.2)',
                      alignItems:'center',
                      justifyContent:'center',
                      width:50,
                      height:50,
                      position: 'absolute',
                      left:width-65,
                      bottom:80,
                      zIndex: 1000,
                      borderRadius:100,
                   }}>

                   <Image
                   source={require('../assets/img/play.png')}
                   style={{width: 30, height: 30}}>
                   </Image>
    </TouchableOpacity>


      </View>
    );
  }
}

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
