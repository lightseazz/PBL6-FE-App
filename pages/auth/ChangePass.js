import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { checkCorrectPassword } from "../../utils/common";

export default function ChangePass({ navigation, route }) {
  const { email } = route.params;
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordAgainError, setPasswordAgainError] = useState("");
  const [otp, setOtp] = useState("");
  const [pressError, setPressError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState([true, true]);
  const [clicked, setClicked] = useState(false);

  const onChangePassword = (text) => {
    setPassword(text);
    setPasswordError(checkCorrectPassword(text).error);
  };

  const onChangePasswordAgain = (text) => {
    setPasswordAgain(text);
    setPasswordAgainError(checkCorrectPassword(text).error);
  };

  async function onChangePass() {
    setClicked(true);
    if (
      checkCorrectPassword(password).correct == false ||
      checkCorrectPassword(passwordAgain).correct == false
    ) {
      {
        setClicked(false);
        setSignUpError("Invalid format entry above");
        return;
      }
    }
    if (password != passwordAgain) {
      setClicked(false);
      setSignUpError("please type the same password");
      return;
    }

    ////////////////////////////////////////////////////////////////////////////
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("x-apikey", "5J0jCR1dAkvDt3YVoahpux0eawahkQB9");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      newPassword: password,
      otp: otp,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://api.firar.live/api/Auth/forgot-password",
      requestOptions
    )
      .then((response) => response)
      .catch((error) => error);

    ////////////////////////////////////////////////////////////////////////////

    console.log(result.title, result.status);
    if (result.status != 200) {
      setClicked(false);
      setPressError(result.title);
      return;
    }
    navigation.navigate("SuccessPage", {
      text: "You change pass successfully",
    });
  }

  return (
    <View style={general.centerView}>
      <View style={styles.input}>
        <TextInput
          secureTextEntry={secureTextEntry[0]}
          label="Enter New Password"
          onChangeText={onChangePassword}
          mode="outlined"
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => {
                setSecureTextEntry([!secureTextEntry[0], secureTextEntry[1]]);
                return false;
              }}
            />
          }
        />
        <Text style={styles.error}>{passwordError}</Text>
      </View>
      <View style={styles.input}>
        <TextInput
          secureTextEntry={secureTextEntry[1]}
          label="Enter new Password Again"
          onChangeText={onChangePasswordAgain}
          mode="outlined"
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => {
                setSecureTextEntry([secureTextEntry[0], !secureTextEntry[1]]);
                return false;
              }}
            />
          }
        />
        <Text style={styles.error}>{passwordAgainError}</Text>
      </View>
      <View style={styles.input}>
        <TextInput label="OTP" mode="outlined" onChangeText={setOtp} />
      </View>
      <Text style={styles.error}>{pressError}</Text>
      <Button mode="elevated" onPress={onChangePass} disabled={clicked}>
        Change Password
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    width: "80%",
  },
  error: {
    color: "red",
  },
});
