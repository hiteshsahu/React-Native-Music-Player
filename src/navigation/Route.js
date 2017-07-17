import React from 'react';
import {
  AppRegistry,
  Text,View,Button,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MediaDetail from '../scene/DetailScreen';
import HomeScreen from '../scene/HomeScreen';
import MovieRow from '../components/MediaRow';

class Route extends React.Component {

}
const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Detail: { screen: MediaDetail },
});

AppRegistry.registerComponent('React_Audio_Player', () => SimpleApp);
