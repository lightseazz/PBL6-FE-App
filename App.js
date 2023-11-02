import Auth from "./components/authPage/Auth";
import bottomTab from "./components/bottomTab/BottomTab";
import WorkspaceCreate from "./components/workspaceManager/WorkspaceCreate";
import ChatChannel from "./components/chatChannel/ChatChannel";
import { header } from "./utils/common";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";

const isSignedIn = false;
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isSignedIn ? "Login" : "WorkspaceList"}
          screenOptions={{ headerShown: false }}
        >
          {isSignedIn ? (
            Auth()
          ) : (
            <>
              <Stack.Screen name="bottomTab" component={bottomTab} />
              <Stack.Screen
                name="WorkspaceCreate"
                component={WorkspaceCreate}
                options={header({ title: "Create Workspace" })}
              />
              <Stack.Screen name="Chat" component={ChatChannel} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
