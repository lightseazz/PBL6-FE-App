import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import TxtInput from "../../components/TxtInput";
import { useState } from "react";
import { checkCorrectEmail } from "../../utils/common";

export default function EnterEmail({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

  const onChangeEmail = (text) => {
    setEmail(text);
    setError(checkCorrectEmail(text).error);
  };

  async function onPressOK() {
    setClicked(true);
    if (checkCorrectEmail(email).correct == false) {
      {
        setClicked(false);
        setError(checkCorrectEmail(email).error);
        return;
      }
    }
    /////////////////////////////////////////////////////////////////////////
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("x-apikey", "5J0jCR1dAkvDt3YVoahpux0eawahkQB9");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      otpType: 3,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://api.firar.live/api/Auth/get-otp",
      requestOptions
    )
      .then((response) => response)
      .catch((error) => error);

    //////////////////////////////////////////////////////////////////////////

    if (result.status != 200) {
      setClicked(false);
      setError("invalid email");
      return;
    }

    navigation.navigate("ChangePass", {
      email: email,
    });

    setClicked(false);
  }

  return (
    <View style={general.centerView}>
      <Text>Enter your email: </Text>
      <TxtInput label="Email" onChangeText={onChangeEmail} />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button mode="elevated" onPress={onPressOK} disabled={clicked}>
        OK
      </Button>
    </View>
  );
}
