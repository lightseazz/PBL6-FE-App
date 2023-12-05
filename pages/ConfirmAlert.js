import { Alert } from "react-native";

export default function ConfirmAlert({
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
