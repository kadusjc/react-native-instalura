import React, { Component } from 'react'
import { TextInput, View, Button, Text } from 'react-native'
import axios from 'axios'

import AsyncStorage from '@react-native-community/async-storage';
import LoginStyles from '../styles/login-styles'

const loginUri = 'https://instalura-api.herokuapp.com/api/public/login'

export default class Login extends Component {
    constructor () {
        super()
        this.state = { user: '', password: '', mensagem: '' }
    }

    async doRequest (user, password) {        
        const token = await axios.post(loginUri, {login: user, senha: password})
        if (!token || !token.data) throw new Error('Não pude efetuar login maluko!')
        return token.data
    }

    async doLogin () {
        try {
            const {navigate} = this.props.navigation
            const {user, password} = this.state
            
            const token = await this.doRequest(user, password)
            await AsyncStorage.setItem('token',  token)            
            await AsyncStorage.setItem('user', user)
            return navigate('Feed')                
        } catch(error) {
            this.setState({mensagem: error.message})        
        } 
    }

    render () {        
        return  (
            <View style={LoginStyles.container}>
                <Text style={LoginStyles.title}>Instalura</Text>    
                <View style={LoginStyles.form}>
                    <TextInput style={LoginStyles.input} placeholder="User..."
                        onChangeText={user => this.setState({user})}
                        autoCapitalize="none"/>

                    <TextInput style={LoginStyles.input} placeholder="Password..."
                        onChangeText={password => this.setState({password})}
                        secureTextEntry={true}/>

                    <Button title="Login" 
                        style={LoginStyles.buton}
                        onPress={this.doLogin.bind(this)}></Button>    
                </View>

                <Text styles={LoginStyles.errorMessage}>{this.state.mensagem}</Text>
            </View>
        )
    }
}  
