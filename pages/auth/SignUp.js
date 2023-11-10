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
  const [clicked, setClicked] = useState(false);

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

  async function signUpPress({ email, username, password, passwordAgain }) {
    setClicked(true);
    if (
      checkCorrectEmail(email).correct == false ||
      checkCorrectUsername(username).correct == false ||
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
    ////////////////////////////////////////////////////////////////////////////////
    var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("x-apikey", "5J0jCR1dAkvDt3YVoahpux0eawahkQB9");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: email,
      Username: username,
      Password: password,
      FirstName: "string",
      LastName: "string",
      Phone: "3",
      Gender: true,
      BirthDay: "2023-11-08T07:36:16.447Z",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://api.firar.live/api/Auth/signup",
      requestOptions
    )
      .then(function (response) {
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
    if (result.Token == null) {
      setSignUpError(result.title);
      setClicked(false);
      return;
    }

    ////////////////////////////////////////////////////////////////////////////////
    navigation.navigate("Verify", {
      Token: result.Token,
      email: email,
    });
    setClicked(false);
  }
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
        disabled={clicked}
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
        onPress={() => {
          navigation.navigate("SuccessPage", {
            text: "You Sign Up successfully, Now you can Sign In",
          });
        }}
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
