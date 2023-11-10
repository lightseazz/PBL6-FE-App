import { Text, View, Image } from "react-native";
import { general } from "../../styles/styles";
import { Button } from "react-native-paper";
import TxtInput from "../../components/TxtInput";
import SecureInput from "../../components/SecureInput";
import { AuthContext } from "../../hook/AuthContext";
import { useState, useContext } from "react";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  return (
    <View style={general.centerView}>
      <Image
        style={{
          width: "50%",
          aspectRatio: 1,
          marginBottom: 20,
          borderRadius: 10,
        }}
        source={require("../../assets/slack.png")}
      />
      <TxtInput label="Username" onChangeText={setUsername} />
      <SecureInput label="Password" onChangeText={setPassword} />
      <Button
        onPress={() => navigation.navigate("ChangePass")}
        style={{ alignSelf: "flex-end", marginRight: 30 }}
      >
        Forgot your password
      </Button>
      <Button
        mode="elevated"
        style={{ marginTop: 10 }}
        onPress={() => signIn({ username, password })}
      >
        Login
      </Button>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <Text>Don't have account</Text>
        <Button onPress={() => navigation.navigate("SignUp")}>Sign Up</Button>
      </View>
      <Button
        mode="contained"
        icon="google"
        style={{ marginTop: 30, width: "80%" }}
      >
        Sign In with Google
      </Button>
    </View>
  );
}
