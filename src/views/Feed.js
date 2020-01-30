import React, { Component } from 'react'
import { FlatList, StyleSheet, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

import Post from '../components/Post'
const photoEndpoint = 'https://instalura-api.herokuapp.com/api/fotos'

export default class Feed extends Component {
  
  constructor () {
    super()
    this.state = { pictures: [] }
  }

  async componentDidMount () {
    try {
      const token = await AsyncStorage.getItem('token')
      const requestConfig = {headers: {'X-AUTH-TOKEN': token}}

      const res = await axios(`${photoEndpoint}`, requestConfig)
      this.setState({pictures: res.data})
      
    } catch(error) {
        console.warn('Não foi possível carregar as fotos: ' + error);
        this.setState({status: 'ERRO'})
    }
  }

  render() {
    return (
      <FlatList style={styles.container}
          keyExtractor={item => item.id}
          data={this.state.pictures}
          renderItem={ ({item}) => 
            <Post photo={item} /> }
      />
    );
  }
}

const marginTop = Platform.OS === 'ios'? 20 : 0
const styles = StyleSheet.create({
  container: {
    marginTop
  }
})
