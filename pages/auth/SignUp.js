import { Text, View, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { general } from "../../styles/styles";
import { useState } from "react";
import signUpApi from "../../api/authApi/signUp.api";
import {
  checkCorrectUsername,
  checkCorrectPassword,
  checkCorrectEmail,
} from "../../utils/common";
import {
  buttonColor,
  linkColor,
  textInputColor,
} from "../../styles/colorScheme";

export default function SignUp({ navigation }) {
  const [secureTextEntry, setSecureTextEntry] = useState([true, true]);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setnameError] = useState("");
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
    if (firstName == "" || lastName == "") {
      setClicked(false);
      setnameError("firstName/lastName cannot be empty");
			return;

    }

    if (firstName.length > 10 || lastName.length > 10) {
      setClicked(false);
      setnameError("firstName/lastName cannot be more than 10 character");
			return;

    }
    const response = await signUpApi(email, username, firstName, lastName, password);
    if (!response.token) {
      setSignUpError(response.title);
      setClicked(false);
      return;
    }

    navigation.navigate("Verify", {
      Token: response.token,
      email: email,
    });
    setClicked(false);
  }
  return (
    <View style={general.centerView}>
      <View style={{ width: "80%", marginTop: 40 }}>
        <TextInput
          {...textInputColor}
          label="Email"
          mode="outlined"
          style={styles.input}
          onChangeText={onChangeEmail}
        />
        <Text style={styles.error}>{emailError}</Text>
      </View>
      <View style={{ width: "80%" }}>
        <TextInput
          {...textInputColor}
          label="Username"
          mode="outlined"
          style={styles.input}
          onChangeText={onChangeUsername}
        />
        <Text style={styles.error}>{usernameError}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
        <View style={{ width: "47%" }}>
          <TextInput
            {...textInputColor}
            label="firstName"
            mode="outlined"
            style={styles.input}
            onChangeText={setFirstName}
          />
          <Text style={styles.error}>{nameError}</Text>
        </View>
        <View style={{ width: "47%" }}>
          <TextInput
            {...textInputColor}
            label="lastName"
            mode="outlined"
            style={styles.input}
            onChangeText={setLastName}
          />
          <Text style={styles.error}>{nameError}</Text>
        </View>
      </View>

      <View style={{ width: "80%" }}>
        <TextInput
          {...textInputColor}
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
          {...textInputColor}
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
        {...buttonColor}
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
        <Button onPress={() => navigation.navigate("Login")} {...linkColor}>
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
  },
  error: {
    color: "red",
  },
});
