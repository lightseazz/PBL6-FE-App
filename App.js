import Auth from "./components/authPage/Auth";
import bottomTab from "./components/bottomTab/BottomTab";
import WorkspaceCreate from "./components/workspaceManager/WorkspaceCreate";
import ChatChannel from "./components/chatChannel/ChatChannel";
import ItemDetail from "./components/notifications/ItemDetail";
import { header } from "./utils/common";
import MyAccount from "./components/userSetting/MyAccount";

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
