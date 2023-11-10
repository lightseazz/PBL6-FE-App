import { View, Text } from "react-native";
import { general } from "../styles/styles";

export default function SuccessPage({ navigation, route }) {
  const { text } = route.params;
  setTimeout(() => {
    navigation.navigate("Login");
  }, 3000);

  return (
    <View style={general.centerView}>
      <Text style={{ color: "green" }}>{text}</Text>
    </View>
  );
}
