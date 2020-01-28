import React, { Component } from 'react'
import { View, Image, TouchableOpacity, TextInput } from 'react-native'
import CommentstStyles from '../styles/comments-styles'

const sendImg = require('../../resources/images/send.jpeg')

export default class Comments extends Component {
    constructor () {
        super()
        this.state = { commentValue: '' }
    }

    render () {
        const { idPicture } = this.props
        return (            
            <View style={CommentstStyles.container}>
                <TextInput style={CommentstStyles.input}
                placeholder='Adicione um comentário...'
                ref={input => this.newCommentInput = input}
                onChangeText={text => this.setState({commentValue: text})}
                onSubmitEditing={() => {
                    this.props.commentCallback(idPicture, this.state.commentValue, this.newCommentInput)
                    this.setState({commentValue: ''})
                }}
                underlineColorAndroid="transparent"/>

                <TouchableOpacity onPress={() => {
                    this.props.commentCallback(idPicture, this.state.commentValue, this.newCommentInput)
                    this.setState({commentValue: ''})
                }}>
                    <Image style={CommentstStyles.sendButton} source={sendImg}/>  
                </TouchableOpacity>  
            </View>
        )
    }
}