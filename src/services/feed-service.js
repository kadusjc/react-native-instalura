import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const photoEndpoint = 'https://instalura-api.herokuapp.com/api/fotos'

export default class FeedService { 
    async doLike (photo) {
        try {
            const token = await AsyncStorage.getItem('token')
            const requestConfig = {method: 'post', headers: {'X-AUTH-TOKEN': token}}
            await axios(`${photoEndpoint}/${photo.id}/like`, requestConfig)          
        } catch(error) {
            console.warn('Não foi possível acionar o LIKE: ' + error);
            this.setState({status: 'ERRO'})
        }
    }

    async loadPictures () {
        try {
            const token = await AsyncStorage.getItem('token')
            const requestConfig = {headers: {'X-AUTH-TOKEN': token}}      
            const res = await axios(`${photoEndpoint}`, requestConfig)
            return res.data            
        } catch(error) {
            console.warn('Não foi possível carregar as fotos: ' + error);
            this.setState({status: 'ERRO'})
        }
    }
}