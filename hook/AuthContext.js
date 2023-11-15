import { createContext } from "react";
import signInApi from "../api/signIn.api";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export function authFunctions(dispatch) {
  return () => ({
    signIn: async ({ username, password }) => {
      dispatch({ type: "LOADING" });

      const response = await signInApi(username, password);

      // handle error respones
      if (!response.token) {
        dispatch({ type: "SIGN_OUT" });
        alert("Username or Password is incorrect");
        return;
      }

      await SecureStore.setItemAsync("userToken", response.token);

      dispatch({ type: "SIGN_IN", token: response.token });
    },
    signOut: async () => {
      await SecureStore.deleteItemAsync("userToken");
      dispatch({ type: "SIGN_OUT" });
    },
  });
}
