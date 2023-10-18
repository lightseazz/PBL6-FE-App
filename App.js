
import Auth from './components/authPage/Auth';
import BottomTab from './components/bottomTab/BottomTab';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();
export default function App() {
  return ( 
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'  screenOptions={{ headerShown: false }}>
          {/* {Auth()} */}
          <Stack.Screen name="BottomTab" component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}


