import { View, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-paper";

export default function UserSetting({ navigation }) {
  return (
    <View style={{ marginTop: StatusBar.currentHeight, alignItems: "center" }}>
      <Button
        style={{ width: "80%", borderRadius: 8 }}
        mode="elevated"
        onPress={() => navigation.navigate("MyAccount")}
      >
        My Account
      </Button>
    </View>
  );
}
