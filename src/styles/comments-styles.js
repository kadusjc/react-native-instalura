import {StyleSheet, Dimensions} from 'react-native'
const width = Dimensions.get('screen').width

module.exports = StyleSheet.create({ 
    container: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
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