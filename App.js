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
import LoadingPage from "./pages/LoadingPage";
import { useReducer, useEffect, useMemo } from "react";
import { AuthContext } from "./hook/AuthContext";

const isSignedIn = true;

const Stack = createNativeStackNavigator();
export default function App() {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isLoading: false,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        case "LOADING":
          return {
            isLoading: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
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

  const authContext = useMemo(
    () => ({
      signIn: async ({ username, password }) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token
        ///////////////////////////////////////////////////////////////
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("x-apikey", "5J0jCR1dAkvDt3YVoahpux0eawahkQB9");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          username: username,
          password: password,
        });
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
        dispatch({ type: "LOADING" });

        const result = await fetch(
          "https://api.firar.live/api/Auth/signin",
          requestOptions
        )
          .then((response) => response.json())
          .catch((error) => error.json());
        ///////////////////////////////////////////////////////////////

        console.log(result.token.substring(0, 5));

        dispatch({ type: "SIGN_IN", token: result.token });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );
  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={isSignedIn ? "Login" : "WorkspaceList"}
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
      </AuthContext.Provider>
    </PaperProvider>
  );
}
