import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './views/Login'
import Feed from './views/Feed'

const Navigator = createStackNavigator({
  'Home': { screen: Login, navigationOptions: {headerShown: false} },
  'Feed': { screen: Feed, navigationOptions: {headerShown: false} }
}) 

const Routes = createAppContainer(Navigator)
export default Routes

// para funcionar a navegação => https://medium.com/@vnbnews.vn/reactnative-react-navigation-error-createstacknavigator-has-been-moved-to-f90deacbdba9