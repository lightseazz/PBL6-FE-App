import { IconButton } from "react-native-paper";

export function header({ title }) {
  return {
    headerTransparent: true,
    headerTitleAlign: "center",
    headerTitle: title,
    headerShown: true,
  };
}
