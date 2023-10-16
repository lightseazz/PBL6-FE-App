import Login from './Login'
import SignUp from './SignUp'
import Verify from './Verify'
import ChangePass from './ChangePass'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Auth() {
    return ( 
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Verify" component={Verify} />
          <Stack.Screen name="ChangePass" component={ChangePass} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }