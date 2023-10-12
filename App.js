import {Login} from './components/authPage/Login'
import {SignUp} from './components/authPage/SignUp'
import {Verify} from './components/authPage/Verify'
import {ChangePass} from './components/authPage/ChangePass'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
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


