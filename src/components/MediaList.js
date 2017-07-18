import React, { Component } from 'react';
import MediaRow from './MediaRow';
import Style from '../Style';
import { AppRegistry,
  ListView,ActivityIndicator,
  Text, View , ToastAndroid,
  RefreshControl} from 'react-native';
  import MusicPlayerModule from '../modules/MusicPlayerModule';

var movieList = require('../mock/movies.json');

export default class MediaList extends Component {

  componentDidMount = () => {
      MusicPlayerModule.fetchAllSongs(
        (errroMessage) => {
              Alert.alert(
              'Error :',
               errroMessage)},
        (responseJSON) => {
                this.setState({
                 dataSource: this.state.dataSource.cloneWithRows(JSON.parse(responseJSON)),
                 loaded: true,
               });
            }
        );
  }

  // Initialize the hardcoded data
  constructor(props) {
    super(props);

    this.state = {
       dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,}),
       isRefreshing: false,
       loaded: false,
    };
  }

_onRefresh() {

     this.setState({isRefreshing: true});

     MusicPlayerModule.fetchAllSongs(
       (errroMessage) => {
             Alert.alert(
             'Error :',
              errroMessage)},
       (responseJSON) => {
               this.setState({
                dataSource: this.state.dataSource.cloneWithRows(JSON.parse(responseJSON)),
                loaded: true,
                isRefreshing: false,
              });
           }
       );
}

  render() {
    const { navigate } = this.props.navigation;

    if(!this.state.loaded)
    {
      return (
       <View style={{flex: 1}}>
         <Text>
           Fetching Songs...
         </Text>

         <ActivityIndicator
           size="large"
           color="#00aa00"
         />
       </View>
     );
    }

    return (
      <View style={{flex: 1}}>

        <ListView
          navigate={this.props.navigate}
          contentContainerStyle={Style.list}
          dataSource={this.state.dataSource}
           renderRow={(rowData) =>
          <MediaRow
           Song = {rowData.songName}
           AlbumArt = {rowData.albumArt}
           Artist = {rowData.artistName}
           Album = {rowData.albumName}
           navigation={this.props.navigation}

            ></MediaRow>}

            refreshControl={
               <RefreshControl
                 refreshing={this.state.isRefreshing}
                 onRefresh={this._onRefresh.bind(this)}
                 tintColor="#ff0000"
                 title="Loading..."
                 titleColor="#00ff00"
                 colors={['#ff0000', '#00ff00', '#0000ff']}
                 progressBackgroundColor="#ffff00"
               />
             }
        />
      </View>
    );
  }
}
