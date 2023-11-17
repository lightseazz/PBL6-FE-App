import { Text, View, StyleSheet } from "react-native";
import { general } from "../../styles/styles";
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../../hook/AuthContext";
import { useState, useContext } from "react";
import { checkCorrectUsername, checkCorrectPassword } from "../../utils/common";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [signInError, setSignInError] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [clicked, setClicked] = useState(false);

  const { signIn } = useContext(AuthContext);

  const onChangeUsername = (text) => {
    setUsername(text);
    setUsernameError(checkCorrectUsername(text).error);
  };

  const onChangePassword = (text) => {
    setPassword(text);
    setPasswordError(checkCorrectPassword(text).error);
  };

  const signInPress = ({ username, password }) => {
    setClicked(true);
    if (username == "dang" && password == "1234") {
      setClicked(false);
      signIn({ username, password });
      return;
    }
    if (
      checkCorrectUsername(username).correct == false ||
      checkCorrectPassword(password).correct == false
    ) {
      {
        setClicked(false);
        setSignInError("Invalid format username or password above");
        return;
      }
    }
    signIn({ username, password });
    setClicked(false);
    setSignInError("Wrong username or password");
  };

  return (
    <View style={general.centerView}>
      <View style={{ width: "80%" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 22,
            alignSelf: "flex-start",
            marginBottom: 20,
          }}
        >
          Let sign you in
        </Text>
        <TextInput
          label="Username"
          onChangeText={onChangeUsername}
          style={styles.input}
          mode="outlined"
        />
        <Text style={styles.error}>{usernameError}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          label="Password"
          onChangeText={onChangePassword}
          style={styles.input}
          mode="outlined"
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => {
                setSecureTextEntry(!secureTextEntry);
                return false;
              }}
            />
          }
        />
        <Text style={styles.error}>{passwordError}</Text>
      </View>
      <Button
        style={{ alignSelf: "flex-end", marginRight: 30 }}
        onPress={() => navigation.navigate("EnterEmail")}
      >
        Forgot your password
      </Button>
      <Button
        disabled={clicked}
        mode="elevated"
        style={{ marginTop: 10 }}
        onPress={() => signInPress({ username, password })}
      >
        Login
      </Button>
      <Text style={styles.error2}>{signInError}</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        <Text>Don't have account</Text>
        <Button onPress={() => navigation.navigate("SignUp")}>Sign Up</Button>
      </View>
      <Button
        mode="contained"
        icon="google"
        style={{ marginTop: 30, width: "80%" }}
      >
        Sign In with Google
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {},
  error: {
    color: "red",
    marginBottom: 10,
  },
  error2: {
    color: "red",
    marginTop: 10,
  },
});
