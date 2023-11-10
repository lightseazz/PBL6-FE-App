import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import TxtInput from "../../components/TxtInput";
import SecureInput from "../../components/SecureInput";

export default function SignUp({ navigation }) {
  return (
    <View style={general.centerView}>
      <TxtInput label="Email" />
      <TxtInput label="Username" />
      <SecureInput label="Password" />
      <SecureInput label="Enter password again" />
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
