import React, { Component } from 'react'
import { View, Image, TouchableOpacity, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { isEmpty, get } from 'lodash'
import { useDispatch } from 'react-redux'
import { onAddComment } from '../redux/actions/PhotoAction'

import CommentsStyle from '../styles/comments-styles'
import FeedService from '../services/feed-service'

const sendImg = require('../../resources/images/send.jpeg')
let commentValue = ''

export default class Comments extends Component {  
    constructor (props) {
      super(props)      
      commentValue = ''
      this.photo = this.props.photo
      this.dispatch = useDispatch()
      this.feedService = new FeedService()    

      let [commentValue, setCommentValue] = useState(commentValue)    
      this.commentValue = commentValue
      this.setCommentValue = setCommentValue          
    }  
    
    async onAddComment () {
      if (isEmpty(get(this.commentValue))) return
      let login = await AsyncStorage.getItem('user')      
      this.dispatch(onAddComment(this.photo, this.commentValue, login))
      this.setCommentValue('')      
    }
    
    render () {
        return (
            <View style={CommentsStyle.newComments} key='newComent'>
                <TextInput style={CommentsStyle.input}
                    placeholder='Adicione um comentário...'
                    onChangeText={text => this.setCommentValue(text)}
                    value={this.commentValue}
                    onSubmitEditing={this.onAddComment.bind(this)}/>

                <TouchableOpacity onPress={() => this.onAddComment()}>
                    <Image style={CommentsStyle.sendButton} source={sendImg}/>  
                </TouchableOpacity>  
            </View>
        )
    }
}