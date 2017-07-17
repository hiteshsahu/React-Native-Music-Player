import React, { Component } from 'react';
import MovieRow from './MediaRow';
import { AppRegistry,
  ListView,
   StyleSheet,
  Text, View ,
  Navigator,
  RefreshControl} from 'react-native';

var movieList = require('../mock/movies.json');

export default class MovieList extends Component {

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
    return (

      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          navigator={this.props.navigator}
          contentContainerStyle={styles.list}
           dataSource={this.state.dataSource}

           renderRow={(rowData) => <MovieRow
           title = {rowData.title}
           thumb = {rowData.cover}
           year = {rowData.year}
           synopsis = {rowData.synopsis}
           movie={rowData}
           // Pass a function to handle row presses
            onPress={()=>{
         // Navigate to a separate movie detail screen
           this.props.navigator.push({
           name: 'Detail',
           title: 'Detail',
           movie: rowData,
         });
       }}
            ></MovieRow>}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#292f36',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 5,
  },
 toolbar: {
   backgroundColor: '#131313',
   height: 56,
   alignSelf: 'stretch',
 },
   list: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     flexWrap: 'wrap',
     paddingHorizontal: 3,
   },

});
