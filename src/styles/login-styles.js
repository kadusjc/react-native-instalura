import {StyleSheet, Dimensions} from 'react-native'
const width = Dimensions.get('screen').width

module.exports = StyleSheet.create({ 
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  form: {
    width: width * 0.8
  },
  input: {
    height: 50,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    fontSize: 15
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold'
  },
  errorMessage: {
    marginTop: 15,
    color: '#e74c3c'
  }
})

