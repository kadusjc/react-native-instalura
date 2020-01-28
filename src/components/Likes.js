import React, { Component } from 'react'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import LikeStyles from '../styles/like-styles'

const s2Empty = require('../../resources/images/s2Empty.png')
const s2Filled = require('../../resources/images/s2Filled.png')

export default class Likes extends Component {

    loadS2Icon (photo) {
      return photo.likeada ?  s2Filled: s2Empty
    }

    drawLikes (likers = []) {
        if (!likers.length) return

        let toPrint = `${likers.length} curtida`
        if (likers.length > 1) toPrint += 's'
        return (
            <Text style={LikeStyles.likes}>
                {toPrint}
            </Text>
        )
    }
    
    render () {
        const { likeCallback, photo } = this.props 
        return  (
            <View>
                <TouchableOpacity onPress={() => likeCallback(photo.id)}>
                    <Image source={this.loadS2Icon(photo)} style={LikeStyles.likeButton}/>        
                </TouchableOpacity>
                {this.drawLikes(photo.likers)}
            </View>
        )
    }
}