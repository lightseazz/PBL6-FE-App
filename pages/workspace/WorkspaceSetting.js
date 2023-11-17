import { View } from "react-native";
import { Button } from "react-native-paper";
import ConfirmAlert from "../ConfirmAlert";

export default function WorkspaceSetting() {
  async function onPressDelete() {}
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <View
        style={{
          width: "80%",
          flex: 1,
        }}
      >
        <Button mode="elevated">Workspace Overview</Button>
      </View>
      <View
        style={{
          width: "80%",
          flexDirection: "column-reverse",
          marginBottom: 20,
        }}
      >
        <Button
          mode="contained"
          style={{ backgroundColor: "#cc0000" }}
          onPress={ConfirmAlert({
            title: "Confirm Deletion",
            message: "are you sure want to delete this Workspace",
            OKText: "Delete",
            onPressOK: onPressDelete,
          })}
        >
          Delete Workspace
        </Button>
      </View>
    </View>
  );
}
