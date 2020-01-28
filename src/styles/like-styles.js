import {StyleSheet, Dimensions} from 'react-native'
const width = Dimensions.get('screen').width

module.exports = StyleSheet.create({  
  likeButton: {
    height: 30,
    width: 30,
    marginBottom: 10
  }, 
  likes: {
    fontWeight: 'bold'
  }
})

