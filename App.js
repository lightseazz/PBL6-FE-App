import "react-native-gesture-handler";
import Auth from "./pages/auth/Auth";
import bottomTab from "./pages/bottomTab/BottomTab";
import WorkspaceCreate from "./pages/workspaceManager/WorkspaceCreate";
import ChatChannel from "./pages/chatChannel/ChatChannel";
import ItemDetail from "./pages/notifications/ItemDetail";
import { header } from "./utils/common";
import MyAccount from "./pages/userSetting/MyAccount";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";

const isSignedIn = true;
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
              <Stack.Screen
                name="Chat"
                component={ChatChannel}
                options={header({ title: "Chat" })}
              />

              <Stack.Screen
                name="ItemDetail"
                component={ItemDetail}
                options={header({ title: "Notifications Detail" })}
              />
              <Stack.Screen
                name="MyAccount"
                component={MyAccount}
                options={header({ title: "MyAccount" })}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
