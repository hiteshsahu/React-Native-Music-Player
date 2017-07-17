import React, { Component } from 'react';
import MediaRow from './MediaRow';
import Style from '../Style';
import { AppRegistry,
  ListView,
  Text, View ,
  RefreshControl} from 'react-native';

var movieList = require('../mock/movies.json');

export default class MediaList extends Component {

  // Initialize the hardcoded data
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
       dataSource: ds.cloneWithRows(movieList),
       isRefreshing: false,
    };
  }

  _onRefresh() {

     this.setState({isRefreshing: true});

     setTimeout(() => {
     // prepend new data
     movieList = require('../mock/movies_new.json');
     const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
     this.setState({
       isRefreshing: false,
       dataSource: ds.cloneWithRows(movieList),
     });
   }, 5000);
  }

  render() {

    const { navigate } = this.props.navigation;
    return (

      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          navigate={this.props.navigate}
          contentContainerStyle={Style.list}
          dataSource={this.state.dataSource}

           renderRow={(rowData) =>
          <MediaRow
           Song = {rowData.title}
           AlbumArt = {rowData.cover}
           Artist = {rowData.year}
           Album = {rowData.synopsis}
           movie=  {rowData}

           navigation={this.props.navigation}

           // Pass a function to handle row presses
           onPress={() => navigate('Detail',
           { Song :rowData.title,
               Artist: 'Lucy',
               Album : "LOVE" ,
               AlbumArt : rowData.cover
             })
          }
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
