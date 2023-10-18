import WorkspaceList from './WorkspaceList';
import WorkspaceCreate from './WorkspaceCreate';
import { IconButton } from 'react-native-paper';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export default function WorkspaceManager({navigation}) {
    return ( 
      <Stack.Navigator 
        initialRouteName='WorkspaceList'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="WorkspaceList" 
          component={WorkspaceList} 
        />
        <Stack.Screen 
          name="WorkspaceCreate" 
          component={WorkspaceCreate} 
          options={{ 
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitle:'Create Workspace',
            headerShown: true,
            headerLeft: () => (
              <IconButton
                icon="close"
                onPress={() => navigation.goBack()}
              />
            ),
          }}
        />
      </Stack.Navigator>
    );
  }