import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { layout } from "../../css/general/layout";

export default function ChangePass({ navigation }) {
  return (
    <View style={layout.container}>
      <TextInput
        mode="outlined"
        label="old Password"
        style={{ width: "80%", marginBottom: 30 }}
      />
      <TextInput
        mode="outlined"
        label="new Password"
        style={{ width: "80%", marginBottom: 30 }}
      />
      <TextInput
        mode="outlined"
        label="new Password Again"
        style={{ width: "80%", marginBottom: 30 }}
      />
      <Button mode="elevated">Change Password</Button>
    </View>
  );
}
