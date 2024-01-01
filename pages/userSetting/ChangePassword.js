import { View, StyleSheet, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import { TextInput } from "react-native-paper";
import { useState } from "react";
import { checkCorrectPassword, successStatusCodes } from "../../utils/common";
import changePasswordApi from "../../api/authApi/changePassword.api";
import getOtpApi from "../../api/authApi/getOtp.api";
import {
  buttonColor,
  linkColor,
  textInputColor,
} from "../../styles/colorScheme";
import { userSignedIn } from "../../globalVar/global";
import StatusSnackBar from "../../components/StatusSnackBar";

export default function ChangePassword({ navigation, route }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState([true, true]);
  const [clicked, setClicked] = useState(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });

  const onChangePassword = (text) => {
    setCurrentPassword(text);
  };

  const onChangePasswordAgain = (text) => {
    setNewPassword(text);
  };

  async function onChangePass() {
    try {
      setClicked(true);
      if (
        checkCorrectPassword(currentPassword).correct == false ||
        checkCorrectPassword(newPassword).correct == false
      ) {
        {
          setSnackBar({ isVisible: true, message: "password format is not correct", type: "failed" });
          setClicked(false);
          return;
        }
      }
      if (currentPassword == newPassword) {
        setSnackBar({ isVisible: true, message: "password must not the same", type: "failed" });
        setClicked(false);
        return;
      }

      const response = await changePasswordApi(currentPassword, newPassword, otp);
      if (!successStatusCodes.includes(String(response.status))) {
        setClicked(false);
        setSnackBar({ isVisible: true, message: "failed: please check your current password or otp", type: "failed" });
        return;
      }
      setSnackBar({ isVisible: true, message: "Successful change password", type: "success" });
      setClicked(false);
    } catch {

      setSnackBar({ isVisible: true, message: "failed change password", type: "failed" });
    }

  }

  async function onGetOtp() {
    try {

      const response = await getOtpApi(2, userSignedIn.email);
      if (response.status == 200) {
        setSnackBar({ isVisible: true, message: "Successful otp send to " + userSignedIn.email, type: "success" });
        return;
      }
      if (response.status == 400) {
        setSnackBar({ isVisible: true, message: response.title || "failed  send otp", type: "failed" });
        return;
      }
    } catch {

    }
  }

  return (
    <>
      <View style={general.centerView}>
        <View style={styles.input}>
          <TextInput
            {...textInputColor}
            style={{ backgroundColor: "white", marginBottom: 20 }}
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
        </View>
        <View style={styles.input}>
          <TextInput
            {...textInputColor}
            style={{ backgroundColor: "white", marginBottom: 20 }}
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
        </View>
        <View style={styles.input}>
          <TextInput
            style={{ backgroundColor: "white", marginBottom: 10 }}
            label="OTP"
            mode="outlined"
            onChangeText={setOtp}
            {...textInputColor}
          />
        </View>
        <Button
          style={{ width: 100, alignSelf: 'flex-start', marginLeft: 40 }}
          mode="elevated"
          onPress={onGetOtp}
          disabled={clicked}
          {...buttonColor}
        >
          get Otp
        </Button>
        <Button
          mode="elevated"
          style={{ marginTop: 30 }}
          onPress={onChangePass}
          disabled={clicked}
          loading={clicked}
          {...buttonColor}
        >
          Change Password
        </Button>
      </View>
      <StatusSnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
    </>
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
