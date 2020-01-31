import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import store from './redux'
import Login from './views/Login'
import Feed from './views/Feed'

const RootStack = createStackNavigator({
  'Home': { screen: Login, navigationOptions: {headerShown: false} },
  'Feed': { screen: Feed, navigationOptions: {headerShown: false} }
}) 

const Navigation = createAppContainer(RootStack)

export default class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }

}
// para funcionar a navegação => https://medium.com/@vnbnews.vn/reactnative-react-navigation-error-createstacknavigator-has-been-moved-to-f90deacbdba9
