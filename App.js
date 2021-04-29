/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import axios from 'react-native-axios';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';

function App() {
  const [query, setQuery] = useState("")
  const [pageToken, setToken] = useState("")
  const [response, setData] = useState([])

  const getData = () => {
    axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&pageToken=' + pageToken + '&maxResults=30&q=' + query + '&type=video&key=AIzaSyCeLJS3Q-4vGSN5GMb8NSr4tTYjtaDBVVg')
      .then(res => {
        setData(response.concat(res.data.items))
        setToken(res.data.nextPageToken)
        console.log(response)
      })
      .catch(err => { console.log(err) });
  }

  return (
    <View style={styles.screen}>
      <View style={styles.search}>
        <TextInput
          style={styles.searchBox}
          placeholder='Search Videos'
          value={query}
          onChangeText={(text) => { setQuery(text) }}
        />
        <View style={styles.searchButton}><Button title='search' color="grey" onPress={() => getData()} /></View>
      </View>

      <View style={styles.list}>
        <FlatList
          data={response}
          onEndReached={() => getData()}
          onEndReachedThreshold={0}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => console.log(item.snippet.title)}>
                <View style={{ margin: 10, marginBottom: 10, borderWidth: 1 }}>
                  <Image
                    source={{ uri: 'https://i.ytimg.com/vi/' + item.id.videoId + '/hqdefault.jpg' }}
                    style={styles.image} />
                  <View style={{ backgroundColor: '#333', padding: 10 }}>
                    <Text
                      style={styles.titleText}
                      numberOfLines={2}>
                      {item.snippet.title}
                    </Text>
                    <Text style={styles.channelText}>
                      {item.snippet.channelTitle}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
          keyExtractor={item => item.id.videoId}
        />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 220
  },
  channelText: {
    fontSize: 16,
    color: 'white'
  },
  titleText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  list: {
    flex: 1,
    paddingVertical: 10
  },
  search: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  searchButton: {
    paddingLeft: 5,
  },
  searchBox: {
    marginTop: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    width: "79%",
    fontSize: 15,
    backgroundColor:'#e4e9ec'
  },
  screen: {
    flex: 1,
    backgroundColor:'#3b393c'
  }
});

export default App;