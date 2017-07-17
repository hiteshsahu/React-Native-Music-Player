import React from 'react';
import {
  AppRegistry,
  Text,View,Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MovieRow from '../components/MediaRow';
export default class HomeScreen extends React.Component {

  //Tollbar title
  static navigationOptions = {
    title: 'React Native Media Player',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>

        <MovieRow />

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
