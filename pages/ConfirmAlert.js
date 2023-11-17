import { Alert } from "react-native";

export default function createTwoButtonAlert({
  title,
  message,
  OKText,
  onPressOK,
}) {
  return () =>
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
        },
        { text: OKText, onPress: onPressOK },
      ],
      {
        cancelable: true,
      }
    );
}
