import React, { Component } from 'react'
import { TextInput, View, Button, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import LoginStyles from '../styles/login-styles'

const loginUri = 'https://instalura-api.herokuapp.com/api/public/login'

export default class Login extends Component {
    constructor () {
        super()
        this.state = { login: '', senha: '', mensagem: '' }
    }

    async doRequest (user, password) {
        const requestInfo = { 
            body: JSON.stringify({login: user, senha: password}), 
            method: 'POST',
            headers: new Headers({'Content-type': 'application/json'})
        }

        const response = await fetch(loginUri, requestInfo)
        const responseJson = await response.text()
        if (!responseJson) throw new Error('Não pude efetuar login maluko!')
        return responseJson
    }

    async doLogin () {
        try {
            const {navigation} = this.props
            const {user, password} = this.state
            
            const token = await this.doRequest(user, password)
            console.warn('TOKEN ', token)
            await AsyncStorage.setItem('token', token)            
            await AsyncStorage.setItem('user', user)
            return navigation.navigate('Feed')                
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
