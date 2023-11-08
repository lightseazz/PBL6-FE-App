import { View, Text } from "react-native";
import { general } from "../styles/styles";

export default function LoadingPage() {
  return (
    <View style={general.centerView}>
      <Text>Loading ...</Text>
    </View>
  );
}
