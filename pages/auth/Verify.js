import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import TxtInput from "../../components/TxtInput";
import { useState } from "react";

export default function Verify({ navigation, route }) {
  const { Token, email } = route.params;
  const [verify, setVerify] = useState("");
  const [verifyError, setVerifyError] = useState("");
  async function verifyPress() {
    console.log(Token);
    ///////////////////////////////////////////////////////////////
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("x-apikey", "5J0jCR1dAkvDt3YVoahpux0eawahkQB9");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", "Bearer " + Token);

    var raw = JSON.stringify({
      Otp: verify,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://api.firar.live/api/Auth/verify-register",
      requestOptions
    )
      .then((response) => response)
      .catch((error) => error);
    /////////////////////////////////////////////////////////////

    console.log(result.title, result.status);
    if (result.status != 200) {
      setVerifyError(result.title);
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
      <TxtInput label="OTP input" onChangeText={setVerify} />
      <Button mode="elevated" onPress={verifyPress}>
        Verify
      </Button>
    </View>
  );
}
