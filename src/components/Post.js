import React, { Component, useState } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { onPhotoLike } from '../redux/actions/PhotoAction'

import PostStyles from '../styles/post-styles'
import Comments from './Comments'
import FeedService from '../services/feed-service'

const s2Empty = require('../../resources/images/s2Empty.png')
const s2Filled = require('../../resources/images/s2Filled.png')

export default class Post extends Component {  

  constructor (props) {
    super(props)
    this.feedService = new FeedService()

    this.dispatch = useDispatch()

    let [photo, setPhoto] = useState(this.props.photo)    
    this.photo = photo
    this.setPhoto = setPhoto    
  }  

  async onPhotoLike () {    
    let login = await AsyncStorage.getItem('user')
    await this.feedService.doLike(this.photo)
    this.dispatch(onPhotoLike(this.photo))    
    this.setPhoto(this.props.photo)    
  }

  loadS2Icon () {
    return this.photo.likeada ?  s2Filled: s2Empty
  }

  drawSubtitle () {
    return (
      <View style={PostStyles.subtitle} key='legendaFoto'>
        <Text style={PostStyles.titleComments}>{this.photo.loginUsuario}</Text>
        <Text>{this.photo.comentario}</Text>
      </View>
    )
  }  

  drawComments () {
    const comentarios = this.photo.comentarios
    return comentarios.map((comm) => (
      <View style={PostStyles.comments} key={comm.id}>
        <Text id={comm.id} style={PostStyles.titleComments}>{comm.login}</Text>
        <Text id={comm.id}>{comm.texto}</Text>
      </View>
    ))
  }

  drawLikes (likers = []) {
    if (!likers.length) return

    let toPrint = `${likers.length} curtida`
    if (likers.length > 1) toPrint += 's'
    return (
      <Text style={PostStyles.likes}>
        {toPrint}
      </Text>
    )
  }

  render () {
    return (
        <View key='main'>
            <View style={PostStyles.header} key='header'>
                <Image source={{uri: photo.urlPerfil}} style={PostStyles.profilePhoto} />
                <Text>{photo.loginUsuario}</Text>  
            </View>
            <TouchableOpacity onPress={() => this.onPhotoLike()}>
              <Image source={{uri: photo.urlFoto}} style={PostStyles.postPhoto} />        
            </TouchableOpacity>
            <View style={PostStyles.footer}>
                <TouchableOpacity onPress={() => this.onPhotoLike()}>
                    <Image source={this.loadS2Icon()} style={PostStyles.likeButton}/>        
                </TouchableOpacity>
                {this.drawLikes()}
                {this.drawSubtitle()}
                {this.drawComments()}                
                <Comments photo={this.photo}/>
            </View>
        </View>
    )
  }
}
