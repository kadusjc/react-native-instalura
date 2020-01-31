import React, { Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadPictures } from '../redux/actions/PhotoAction'

import { FlatList, StyleSheet, Platform } from 'react-native'

import Post from '../components/Post'
import FeedService from '../services/feed-service'

export default class Feed extends Component {
  
  constructor () {
    super()
    this.feedService = new FeedService()
    this.photosSelector = []
    this.dispatch = useDispatch()
  }

  async componentDidMount () {
    const pictures = await this.feedService.loadPictures()
    this.dispatch(loadPictures(pictures)) 
    this.photosSelector = useSelector(store => store.photosState.photos)        
  }

  render() {
    return (
      <FlatList style={styles.container}
          keyExtractor={item => item.id}
          data={this.photosSelector}
          renderItem={ ({item}) => 
            <Post photo={item} />
          }
      />      
    )
  }
}

const marginTop = Platform.OS === 'ios'? 20 : 0
const styles = StyleSheet.create({
  container: {
    marginTop
  }
})
