import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Post from './src/components/Post'

const photoEndpoint = 'https://instalura-api.herokuapp.com/api/public/fotos/rafael'
export default class App extends Component {
  
  constructor () {
    super()
    this.state = { pictures: [] }
  }

  componentDidMount () {
    const _self = this
    fetch(photoEndpoint)
      .then(res => res.json())
      .then(json => this.setState({pictures: json}))
      .catch(e => {
        console.warn('Não foi possível carregar as fotos: ' + e);
        this.setState({status: 'ERRO'})
      });
  }

  render() {
    return (
      <FlatList style={styles.container}
          keyExtractor={item => item.id}
          data={this.state.pictures}
          renderItem={ ({item}) => <Post photo={item}/> }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})
