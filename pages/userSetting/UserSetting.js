import { View } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../hook/AuthContext";
import { useContext } from "react";
import { buttonColor } from "../../styles/colorScheme";

export default function UserSetting({ navigation }) {
  const { signOut } = useContext(AuthContext);
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Button
        {...buttonColor}
        style={{ width: "80%", borderRadius: 8, marginTop: 20 }}
        mode="elevated"
        onPress={() => navigation.navigate("MyAccount")}
      >
        My Account
      </Button>
      <Button
        {...buttonColor}
        style={{ width: "80%", borderRadius: 8, marginTop: 20 }}
        mode="elevated"
        onPress={() => navigation.navigate("ChangePassword")}
      >
        Change Password
      </Button>
      <View
        style={{
          flex: 1,
          flexDirection: "column-reverse",
          width: "100%",
          alignItems: "center",
          padding: 30,
        }}
      >
        <Button
          style={{ width: "80%", borderRadius: 8, backgroundColor: "#cc0000" }}
          mode="contained"
          onPress={signOut}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}
