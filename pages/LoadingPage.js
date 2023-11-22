import { View, Text } from "react-native";
import { general } from "../styles/styles";
import { ActivityIndicator } from "react-native-paper";

export default function LoadingPage() {
  return (
    <View style={general.centerView}>
      <ActivityIndicator animating={true} size={100} color="black" />
      <Text>Loading ...</Text>
    </View>
  );
}
