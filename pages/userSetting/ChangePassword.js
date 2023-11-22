import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { checkCorrectPassword } from "../../utils/common";
import changePassApi from "../../api/authApi/changePass.api";
import {
  buttonColor,
  linkColor,
  textInputColor,
} from "../../styles/colorScheme";

export default function ChangePassword({ navigation, route }) {
  //   const { email } = route.params;
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordAgainError, setPasswordAgainError] = useState("");
  const [otp, setOtp] = useState("");
  const [pressError, setPressError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState([true, true]);
  const [clicked, setClicked] = useState(false);

  const onChangePassword = (text) => {
    setCurrentPassword(text);
    setPasswordError(checkCorrectPassword(text).error);
  };

  const onChangePasswordAgain = (text) => {
    setNewPassword(text);
    setPasswordAgainError(checkCorrectPassword(text).error);
  };

  async function onChangePass() {
    setClicked(true);
    if (
      checkCorrectPassword(currentPassword).correct == false ||
      checkCorrectPassword(newPassword).correct == false
    ) {
      {
        setClicked(false);
        setSignUpError("Invalid format entry above");
        return;
      }
    }
    if (currentPassword != newPassword) {
      setClicked(false);
      setSignUpError("please type the same password");
      return;
    }

    const response = await changePassApi(email, currentPassword, otp);

    if (response.status != 200) {
      setClicked(false);
      setPressError(response.title);
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
          {...textInputColor}
          style={{ backgroundColor: "white" }}
          secureTextEntry={secureTextEntry[0]}
          label="Enter current password"
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
          {...textInputColor}
          style={{ backgroundColor: "white" }}
          secureTextEntry={secureTextEntry[1]}
          label="Enter new password"
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
        <TextInput
          style={{ backgroundColor: "white" }}
          label="OTP"
          mode="outlined"
          onChangeText={setOtp}
          {...textInputColor}
        />
      </View>
      <Text style={styles.error}>{pressError}</Text>
      <Button
        mode="elevated"
        onPress={onChangePass}
        disabled={clicked}
        {...buttonColor}
      >
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
