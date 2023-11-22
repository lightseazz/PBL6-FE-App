import { Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { general } from "../../styles/styles";
import { useState } from "react";
import verifyApi from "../../api/authApi/verify.api";
import {
  buttonColor,
  linkColor,
  textInputColor,
} from "../../styles/colorScheme";

export default function Verify({ navigation, route }) {
  const { Token, email } = route.params;
  const [verify, setVerify] = useState("");
  const [verifyError, setVerifyError] = useState("");
  async function verifyPress() {
    const respone = await verifyApi(Token, verify);
    if (respone.status != 200) {
      setVerifyError(respone.title);
      return;
    }

    navigation.navigate("SuccessPage", {
      text: "You Sign Up successfully, Now you can Sign In",
    });
  }

  return (
    <View style={general.centerView}>
      <Text style={{ marginBottom: 30 }}>
        We have sent OTP to gmail:
        <Text style={{ color: "blue" }}>{email}</Text>
      </Text>
      <Text style={{ color: "red" }}>{verifyError}</Text>
      <TextInput
        mode="outlined"
        secureTextEntry
        label="OTP input"
        onChangeText={setVerify}
        style={{ backgroundColor: "white", width: "80%" }}
        {...text}
      />
      <Button mode="elevated" onPress={verifyPress} {...buttonColor}>
        Verify
      </Button>
    </View>
  );
}
