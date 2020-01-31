import React, { Component } from 'react'
import { TextInput, View, Button, Text } from 'react-native'

import LoginStyles from '../styles/login-styles'
import LoginService from '../services/login-service'

export default class Login extends Component {
    constructor () {
        super()
        this.loginService = new LoginService()
        this.state = { user: '', password: '', mensagem: '' }
    }

    async doLogin () {
        try {
            const {navigate} = this.props.navigation
            const {user, password} = this.state            
            await this.loginService.doLogin(user, password)
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
