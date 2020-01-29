import React, { Component } from 'react'
import { TextInput, View, Button, Text, AsyncStorage } from 'react-native'
import LoginStyles from '../styles/login-styles'

const loginUri = 'https://instalura-api.herokuapp.com/api/public/login'

export default class Login extends Component {
    static navigationOption = {
        title: 'Login'
    }

    constructor () {
        super()
        this.state = { login: '', senha: '', mensagem: '' }
    }

    async doLogin () {
        try {
            const {user, password} = this.state
            const requestInfo = { 
                body: JSON.stringify({login: user, senha: password}), 
                method: 'POST',
                headers: new Headers({'Content-type': 'application/json'})
            }

            const response = await fetch(loginUri, requestInfo)
            if (!response.ok) throw new Error('Não pude efetuar login maluko!')

            const token = response.text()
            await AsyncStorage.setItem('token', token)            
            await AsyncStorage.setItem('user', user)
            this.props.navigation.navigate('Feed')                
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
