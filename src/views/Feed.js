import React, { Component } from 'react';
import { FlatList, StyleSheet, Platform, AsyncStorage } from 'react-native';
import Post from '../components/Post'
import { isEmpty, find } from 'lodash'

const photoEndpoint = 'https://instalura-api.herokuapp.com/api/public/fotos'

export default class Feed extends Component {
  
  constructor () {
    super()
    this.state = { pictures: [] }
  }

  async componentDidMount () {
    try {
      const token = await AsyncStorage.getItem('usuario')
      const header = new Headers({'X-AUTH-TOKEN': token})

      const res = await fetch(photoEndpoint, )
      this.setState({pictures: res.json()})

    } catch(error) {
        console.warn('Não foi possível carregar as fotos: ' + e);
        this.setState({status: 'ERRO'})
    }
  }

  findPictureById (idPicture) {
    return find(this.state.pictures, {id: idPicture})    
  }

  async onAddComment (idPicture, commentValue, newCommentInput) {
    const login = await AsyncStorage.getItem('user')

    if (isEmpty(commentValue)) return
    let targetPhoto = this.findPictureById(idPicture)
    targetPhoto.comentarios.push({id: commentValue, login, texto: commentValue})

    const refreshPictures = this.state.pictures.map((pic) => {
      if (pic.id === idPicture) return targetPhoto
      return pic
    })
    this.setState({pictures: refreshPictures})
    newCommentInput.clear()
  }

  onPhotoLike (idPhoto) {
    const { pictures } = this.state
    let photo = this.findPictureById(idPhoto)

    let likers = []    
    if (!photo.likeada) {
        likers = photo.likers.concat({login})
    } else {
        likers = photo.likers.filter(liker => liker.login !== login)
    }
    const updatedPhoto = {...photo, likeada: !photo.likeada, likers}    
    let newPictures = pictures.map((photo) => photo.id === updatedPhoto.id ? updatedPhoto : photo)
    this.setState({pictures: newPictures})
  }

  render() {
    return (
      <FlatList style={styles.container}
          keyExtractor={item => item.id}
          data={this.state.pictures}
          renderItem={ ({item}) => 
            <Post photo={item}
              commentCallback={this.onAddComment.bind(this)} 
              likeCallback={this.onPhotoLike.bind(this)} /> }
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
