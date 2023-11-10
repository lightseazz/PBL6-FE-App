import { View, StyleSheet, StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../../hook/AuthContext";
import { useContext } from "react";

export default function UserSetting({ navigation }) {
  const { signOut } = useContext(AuthContext);
  return (
    <View
      style={{
        marginTop: StatusBar.currentHeight,
        alignItems: "center",
        flex: 1,
      }}
    >
      <Button
        style={{ width: "80%", borderRadius: 8 }}
        mode="elevated"
        onPress={() => navigation.navigate("MyAccount")}
      >
        My Account
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
          style={{ width: "80%", borderRadius: 8 }}
          mode="contained"
          onPress={signOut}
        >
          Logout
        </Button>
      </View>
    </View>
  );
}
