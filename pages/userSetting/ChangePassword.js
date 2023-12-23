import { View, StyleSheet, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { checkCorrectPassword } from "../../utils/common";
import changePasswordApi from "../../api/authApi/changePassword.api";
import getOtpApi from "../../api/authApi/getOtp.api";
import {
  buttonColor,
  linkColor,
  textInputColor,
} from "../../styles/colorScheme";
import { userSignedIn } from "../../globalVar/global";

export default function ChangePassword({ navigation, route }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordAgainError, setPasswordAgainError] = useState("");
  const [otp, setOtp] = useState("");
  const [pressError, setPressError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState([true, true]);
  const [clicked, setClicked] = useState(false);
  const [otpText, setOtpText] = useState("");

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
        return;
      }
    }
    if (currentPassword == newPassword) {
			setPressError("password must not the same");
      setClicked(false);
      return;
    }

    console.log("hello");
    const response = await changePasswordApi(currentPassword, newPassword, otp);
    if (response.status != 200) {
      setClicked(false);
      setPressError(response.title);
      setClicked(true);
      return;
    }
    Alert.alert("Successful change password");

  }

  async function onGetOtp() {
    const response = await getOtpApi(2, userSignedIn.email);
    console.log(response.status);
    if (response.status == 200) {
      setOtpText("successful otp send to " + userSignedIn.email);
    }
    else {
      setOtpText("failed send otp");
    }
  }

  return (
    <View style={general.centerView}>
      <View style={styles.input}>
        <Button
          style={{ width: "50%", }}
          mode="elevated"
          onPress={onGetOtp}
          disabled={clicked}
          {...buttonColor}
        >
          get Otp
        </Button>
        <Text style={{ marginBottom: 50, }}>{otpText}</Text>
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
