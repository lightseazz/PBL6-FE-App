import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import TxtInput from "../../components/TxtInput";
import { useState } from "react";
import { checkCorrectEmail } from "../../utils/common";
import enterEmailApi from "../../api/enterEmail.api";

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

    const response = await enterEmailApi(email);

    if (response.status != 200) {
      setClicked(false);
      setError(response.title);
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
      <Text style={{ color: "red", marginBottom: 20 }}>{error}</Text>
      <Button mode="elevated" onPress={onPressOK} disabled={clicked}>
        OK
      </Button>
    </View>
  );
}
