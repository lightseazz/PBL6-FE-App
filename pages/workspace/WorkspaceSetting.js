import { View } from "react-native";
import { Button } from "react-native-paper";
import ConfirmAlert from "../ConfirmAlert";
import deleteWpApi from "../../api/workspaceApi/deleteWp.api";
import { Alert } from "react-native";
import { buttonColor } from "../../styles/colorScheme";

export default function WorkspaceSetting({ route, navigation }) {
  const { workspaceId } = route.params;
  async function onPressDelete() {
    const response = await deleteWpApi(workspaceId);
    if (response.status != 200) {
      Alert.alert("delete workspace failed");
      return;
    }
    navigation.navigate("WorkspaceList");
  }
  return (
    <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <View
        style={{
          width: "80%",
          flex: 1,
        }}
      >
        <Button
          {...buttonColor}
          mode="elevated"
          onPress={() =>
            navigation.navigate("WorkspaceOverview", {
              workspaceId: workspaceId,
            })
          }
        >
          Workspace Overview
        </Button>
        <Button
					style = {{marginTop: 20}}
          {...buttonColor}
          mode="elevated"
          onPress={() =>
            navigation.navigate("WspMemberManagement", {
              workspaceId: workspaceId,
            })
          }
        >
          Members
        </Button>
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
