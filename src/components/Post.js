import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import PostStyles from '../styles/post-styles'
import { isEmpty, get } from 'lodash'


const s2Empty = require('../../resources/images/s2Empty.png')
const s2Filled = require('../../resources/images/s2Filled.png')
const sendImg = require('../../resources/images/send.jpeg')

export default class Post extends Component {  

  constructor (props) {
    super(props)
    this.state = { photo: this.props.photo, commentValue: '' }
  }  

  loadS2Icon (photo) {
    return photo.likeada ?  s2Filled: s2Empty
  }

  drawSubtitle (photo) {
    return (
      <View style={PostStyles.subtitle} key='legendaFoto'>
        <Text style={PostStyles.titleComments}>{photo.loginUsuario}</Text>
        <Text>{photo.comentario}</Text>
      </View>
    )
  }  

  drawComments (photo) {
    const comentarios = photo.comentarios
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

  async onPhotoLike (photo) {
    let login = await AsyncStorage.getItem('user')
    let likers = []    

    if (!photo.likeada) {
      likers = photo.likers.concat({login})
    } else {
      likers = photo.likers.filter(liker => liker.login !== login)
    }
    const updatedPhoto = {...photo, likeada: !photo.likeada, likers}
    this.setState({photo: updatedPhoto})
  }

  async onAddComment () {
    if (isEmpty(get(this.state, 'commentValue'))) return
    let login = await AsyncStorage.getItem('user')

    const commentsRepository = [...this.state.photo.comentarios]
    commentsRepository.push({id: this.state.commentValue, login, texto: this.state.commentValue})   
    const photo = {...this.state.photo, comentarios: commentsRepository}
    this.setState({photo, commentValue: ''})
    this.newCommentInput.clear()
  }

  render () {
    const { photo } = this.state
    return (
        <View key='main'>
            <View style={PostStyles.header} key='header'>
                <Image source={{uri: photo.urlPerfil}} style={PostStyles.profilePhoto} />
                <Text>{photo.loginUsuario}</Text>  
            </View>
            <TouchableOpacity onPress={() => this.onPhotoLike(photo)}>
              <Image source={{uri: photo.urlFoto}} style={PostStyles.postPhoto} />        
            </TouchableOpacity>
            <View style={PostStyles.footer}>
                <TouchableOpacity onPress={() => this.onPhotoLike(photo)}>
                    <Image source={this.loadS2Icon(photo)} style={PostStyles.likeButton}/>        
                </TouchableOpacity>
                {this.drawLikes(photo.likers)}
                {this.drawSubtitle(photo)}
                {this.drawComments(photo)}
                
                <View style={PostStyles.newComments} key='newComent'>
                  <TextInput style={PostStyles.input}
                    placeholder='Adicione um comentário...'
                    ref={input => this.newCommentInput = input}
                    onChangeText={text => this.setState({commentValue: text})}
                    onSubmitEditing={this.onAddComment.bind(this)}/>

                  <TouchableOpacity onPress={this.onAddComment.bind(this)}>
                    <Image style={PostStyles.sendButton} source={sendImg}/>  
                  </TouchableOpacity>  

                </View>
            </View>
        </View>
    )
  }
}
