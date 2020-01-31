import axios from 'axios' 
import AsyncStorage from '@react-native-community/async-storage'

const loginUri = 'https://instalura-api.herokuapp.com/api/public/login'

export default class LoginService { 
    async doLogin (user, password) {
        const token = await axios.post(loginUri, {login: user, senha: password})
        if (!token || !token.data) throw new Error('Não pude efetuar login maluko!')

        await AsyncStorage.setItem('token',  token.data)            
        await AsyncStorage.setItem('user', user)            
        return token.data    
    }
}