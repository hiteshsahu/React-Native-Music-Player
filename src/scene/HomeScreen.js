import React from 'react';
import Style from '../Style';
import {
  AppRegistry,
  Text,View,Button,Alert, ToastAndroid,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MovieRow from '../components/MediaRow';
import MediaList from '../components/MediaList'
import MusicPlayerModule from '../modules/MusicPlayerModule';
export default class HomeScreen extends React.Component {

  //Tollbar title
  static navigationOptions = {
    title: 'React Native Media Player',
  };

  state{
    movieList
    }


componentDidMount = () => {

    MusicPlayerModule.fetchAllSongs((errroMessage) => {
        //Error Handling
        // Works on both iOS and Android
        Alert.alert(
          'Error :',
            errroMessage)},
            (responseJSON) => {
            this.setState{movieList:responseJSON}
            ToastAndroid.show('Success: '+responseJSON ,ToastAndroid.SHORT);})
           ;}

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Style.container}>
        <Text>Hello, Chat App!</Text>

        <MediaList  navigation={this.props.navigation}
          movieList = this.state.movieList />

        <Button
          onPress={() => navigate('Detail',
          { Song : 'Love Me',
              Artist: 'Lucy',
              Album : "LOVE" ,
              AlbumArt : "https://cdn.traileraddict.com/content/paramount-pictures/ghost-in-the-shell-poster-8.jpg"
            }
          )}
            title="View Detail"
        />

      </View>
    );
  }
}

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
