import "react-native-gesture-handler";
import Auth from "./pages/auth/Auth";
import bottomTab from "./pages/bottomTab/BottomTab";
import WorkspaceCreate from "./pages/workspaceManager/WorkspaceCreate";
import ItemDetail from "./pages/notifications/ItemDetail";
import LeftDrawerScreen from "./pages/workspace/LeftDrawerScreen";
import LeftDrawerContent from "./pages/workspace/LeftDrawerContent";
import RightDrawerContent from "./pages/workspace/RightDrawerContent";
import WorkspaceSetting from "./pages/workspace/WorkspaceSetting";
import WorkspaceOverview from "./pages/workspace/WorkspaceOverview";
import WorkspaceInvite from "./pages/workspace/WorkspaceInvite"
import WspMemberManagement from "./pages/workspace/WspMemberManagement";
import CreateChannel from "./pages/channel/CreateChannel";
import ChannelSetting from "./pages/channel/ChannelSetting";
import ChannelOverview from "./pages/channel/ChannelOverview";
import ChannelInvite from "./pages/channel/ChannelInvite";
import ChangePassword from "./pages/userSetting/ChangePassword";
import ChannelMemberManagement from "./pages/channel/ChannelMemberManagement";
import { header } from "./utils/common";
import ChatColleague from "./pages/colleagueChat/chat/ChatColleague";
import ChatThreadUser from "./pages/colleagueChat/chatThread/ChatThreadUser";
import ChatThreadChannel from "./pages/chatChannel/chatThread/ChatThreadChannel";
import PinChannel from "./pages/chatChannel/chat/PinChannel";
import PinColleague from "./pages/colleagueChat/chat/PinColleague";
import MyAccount from "./pages/userSetting/MyAccount";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadingPage from "./pages/LoadingPage";
import { useReducer, useEffect, useMemo } from "react";
import { AuthContext, authFunctions } from "./hook/AuthContext";
import { authReducer, initialAuthState } from "./hook/authReducer";
import { PaperProvider } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { setGlobalUserSignedIn } from "./globalVar/global";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);
// import { LogLevel, OneSignal } from 'react-native-onesignal';
// import Constants from "expo-constants";


const Stack = createNativeStackNavigator();
export default function App() {
  // // onesignal
  //  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  //  OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);
  // //
  //
  //  // Also need enable notifications to complete OneSignal setup
  //  OneSignal.Notifications.requestPermission(true);

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
                <Stack.Screen
                  name="LeftDrawerScreen"
                  component={LeftDrawerScreen}
                />
                <Stack.Screen
                  name="LeftDrawerContent"
                  component={LeftDrawerContent}
                />
                <Stack.Screen
                  name="RightDrawerContent"
                  component={RightDrawerContent}
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
                  name="WorkspaceInvite"
                  component={WorkspaceInvite}
                  options={header({ title: "Workspace Invite" })}
                />
                <Stack.Screen
                  name="WspMemberManagement"
                  component={WspMemberManagement}
                  options={header({ title: "Workspace members" })}
                />
                <Stack.Screen
                  name="ChannelOverview"
                  component={ChannelOverview}
                  options={header({ title: "Channel Overview" })}
                />
                <Stack.Screen
                  name="ChannelInvite"
                  component={ChannelInvite}
                  options={header({ title: "Invite members" })}
                />
                <Stack.Screen
                  name="CreateChannel"
                  component={CreateChannel}
                  options={header({ title: "Create Channel" })}
                />
                <Stack.Screen
                  name="ChannelSetting"
                  component={ChannelSetting}
                  options={header({ title: "Channel Setting" })}
                />
                <Stack.Screen
                  name="ChannelMemberManagement"
                  component={ChannelMemberManagement}
                  options={header({ title: "Members" })}
                />
                <Stack.Screen
                  name="ChatColleague"
                  component={ChatColleague}
                />
                <Stack.Screen
                  name="ChatThreadUser"
                  component={ChatThreadUser}
                />
                <Stack.Screen
                  name="ChatThreadChannel"
                  component={ChatThreadChannel}
                />
                <Stack.Screen
                  name="PinChannel"
                  component={PinChannel}
                  options={header({ title: "Pin Messages" })}
                />
                <Stack.Screen
                  name="PinColleague"
                  component={PinColleague}
                  options={header({ title: "Pin Messages" })}
                />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangePassword}
                  options={header({ title: "Change Password" })}
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
