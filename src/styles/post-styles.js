import {StyleSheet, Dimensions} from 'react-native'
const width = Dimensions.get('screen').width

module.exports = StyleSheet.create({ 
  header: {
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: 10
  },
  profilePhoto: {
    width: 40, 
    borderRadius: 20, 
    height: 40, 
    marginRight: 10
  },
  postPhoto: {
    width, 
    height: width
  },
  likeButton: {
    height: 30,
    width: 30,
    marginBottom: 10
  },
  footer: {
    margin: 10
  },
  subtitle: {
    flexDirection: 'row', 
    marginBottom: 10
  },
  comments: {
    flexDirection: 'row', 
  }, 
  likes: {
    fontWeight: 'bold'
  },
  titleComments: {
    fontWeight: 'bold',
    marginRight: 5
  },
  input: {
    height: 40,
    fontSize: 17,
    flex: 1
  },
  sendButton: {
    width: 35,
    height: 35
  }
})

