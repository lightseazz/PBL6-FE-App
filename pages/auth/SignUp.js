import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { general } from "../../styles/styles";
import { useState } from "react";
import {
  checkCorrectUsername,
  checkCorrectPassword,
  checkCorrectEmail,
} from "../../utils/common";

export default function SignUp({ navigation }) {
  const [secureTextEntry, setSecureTextEntry] = useState([true, true]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordAgainError, setPasswordAgainError] = useState("");
  const [signUpError, setSignUpError] = useState("");

  const onChangeEmail = (text) => {
    setEmail(text);
    setEmailError(checkCorrectEmail(text).error);
  };

  const onChangeUsername = (text) => {
    setUsername(text);
    setUsernameError(checkCorrectUsername(text).error);
  };

  const onChangePassword = (text) => {
    setPassword(text);
    setPasswordError(checkCorrectPassword(text).error);
  };

  const onChangePasswordAgain = (text) => {
    setPasswordAgain(text);
    setPasswordAgainError(checkCorrectPassword(text).error);
  };

  const signUpPress = ({ email, username, password, passwordAgain }) => {
    if (
      checkCorrectEmail(email).correct == false ||
      checkCorrectUsername(username).correct == false ||
      checkCorrectPassword(password).correct == false ||
      checkCorrectPassword(passwordAgain).correct == false
    ) {
      {
        setSignUpError("Invalid format entry above");
        return;
      }
    }
    if (password != passwordAgain) {
      setSignUpError("please type the same password");
      return;
    }
  };
  return (
    <View style={general.centerView}>
      <View style={{ width: "80%" }}>
        <TextInput
          label="Email"
          mode="outlined"
          style={styles.input}
          onChangeText={onChangeEmail}
        />
        <Text style={styles.error}>{emailError}</Text>
      </View>
      <View style={{ width: "80%" }}>
        <TextInput
          label="Username"
          mode="outlined"
          style={styles.input}
          onChangeText={onChangeUsername}
        />
        <Text style={styles.error}>{usernameError}</Text>
      </View>
      <View style={{ width: "80%" }}>
        <TextInput
          secureTextEntry={secureTextEntry[0]}
          label="Password"
          mode="outlined"
          style={styles.input}
          onChangeText={onChangePassword}
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
      <View style={{ width: "80%" }}>
        <TextInput
          secureTextEntry={secureTextEntry[1]}
          label="Enter password again"
          mode="outlined"
          onChangeText={onChangePasswordAgain}
          style={styles.input}
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
      <Button
        mode="elevated"
        onPress={() =>
          signUpPress({ email, username, password, passwordAgain })
        }
      >
        Sign up
      </Button>
      <Text style={styles.error}>{signUpError}</Text>
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

const styles = StyleSheet.create({
  input: {},
  error: {
    color: "red",
  },
});
