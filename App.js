import "react-native-gesture-handler";
import Auth from "./pages/auth/Auth";
import bottomTab from "./pages/bottomTab/BottomTab";
import WorkspaceCreate from "./pages/workspaceManager/WorkspaceCreate";
import Drawer from "./pages/workspace/Drawer";
import ItemDetail from "./pages/notifications/ItemDetail";
import LeftDrawerContent from "./pages/workspace/LeftDrawerContent";
import WorkspaceSetting from "./pages/workspace/WorkspaceSetting";
import WorkspaceOverview from "./pages/workspace/WorkspaceOverview";
import { header } from "./utils/common";
import MyAccount from "./pages/userSetting/MyAccount";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import LoadingPage from "./pages/LoadingPage";
import { useReducer, useEffect, useMemo } from "react";
import { AuthContext, authFunctions } from "./hook/AuthContext";
import { authReducer, initialAuthState } from "./hook/authReducer";
import * as SecureStore from "expo-secure-store";

const Stack = createNativeStackNavigator();
export default function App() {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContextFunctions = useMemo(authFunctions(dispatch), []);
  return (
    <PaperProvider>
      <AuthContext.Provider value={authContextFunctions}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={state.userToken ? "WorkspaceList" : "Login"}
            screenOptions={{ headerShown: false }}
          >
            {state.isLoading ? (
              <Stack.Screen name="LoadingPage" component={LoadingPage} />
            ) : state.userToken == null ? (
              Auth()
            ) : (
              <>
                <Stack.Screen name="bottomTab" component={bottomTab} />
                <Stack.Screen
                  name="WorkspaceCreate"
                  component={WorkspaceCreate}
                  options={header({ title: "Create Workspace" })}
                />
                <Stack.Screen name="Drawer" component={Drawer} />
                <Stack.Screen
                  name="LeftDrawerContent"
                  component={LeftDrawerContent}
                />
                <Stack.Screen
                  name="WorkspaceSetting"
                  component={WorkspaceSetting}
                  options={header({ title: "Workspace Setting" })}
                />
                <Stack.Screen
                  name="WorkspaceOverview"
                  component={WorkspaceOverview}
                  options={header({ title: "Workspace Overview" })}
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
      </AuthContext.Provider>
    </PaperProvider>
  );
}
