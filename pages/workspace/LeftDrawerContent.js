import { View, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function LeftDrawerContent({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 3, marginTop: 50, width: "80%" }}>
        <TouchableOpacity onPress={() => navigation.navigate("WorkspaceList")}>
          <Icon
            name="keyboard-backspace"
            size={24}
            style={{ marginBottom: 20 }}
          ></Icon>
        </TouchableOpacity>
        <Button
          mode="contained-tonal"
          icon="pound"
          style={{ marginBottom: 20 }}
        >
          Channel 1
        </Button>
        <Button
          mode="contained-tonal"
          icon="pound"
          style={{ marginBottom: 20 }}
        >
          Channel 2
        </Button>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: 40,
          flexDirection: "column-reverse",
          width: "80%",
        }}
      >
        <Button
          mode="contained-tonal"
          icon="cog-outline"
          style={{ marginBottom: 20 }}
          onPress={() => navigation.navigate("WorkspaceSetting")}
        >
          Setting
        </Button>
      </View>
    </View>
  );
}
