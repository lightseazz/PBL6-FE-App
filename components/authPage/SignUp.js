import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { layout } from "../../css/general/layout";

export default function SignUp({ navigation }) {
  return (
    <View style={layout.container}>
      <TextInput
        mode="outlined"
        style={{ width: "80%", marginBottom: 20 }}
        label="gmail"
      />
      <TextInput
        mode="outlined"
        style={{ width: "80%", marginBottom: 20 }}
        label="username"
      />
      <TextInput
        mode="outlined"
        style={{ width: "80%", marginBottom: 20 }}
        label="password"
      />
      <TextInput
        mode="outlined"
        style={{ width: "80%", marginBottom: 30 }}
        label="password again"
      />
      <Button mode="elevated" onPress={() => navigation.navigate("Verify")}>
        Sign up
      </Button>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <Text>Already have an account ? </Text>
        <Button onPress={() => navigation.navigate("Login")}>Login</Button>
      </View>
      <Button
        mode="contained"
        icon="google"
        style={{ marginTop: 30, width: "80%" }}
      >
        Sign Up with Google
      </Button>
    </View>
  );
}
