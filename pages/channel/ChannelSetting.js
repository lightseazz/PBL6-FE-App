import { View } from "react-native";
import { Button } from "react-native-paper";
import ConfirmAlert from "../ConfirmAlert";
import deleteChannelApi from "../../api/channelApi/deleteChannel.api";
import { Alert } from "react-native";
import { buttonColor } from "../../styles/colorScheme";

export default function ChannelSetting({ route, navigation }) {
  const { channelId, workspaceId } = route.params;
  async function onPressDelete() {
    const response = await deleteChannelApi(workspaceId, channelId);
    console.log(response.status);
    if (response.status != 200) {
      Alert.alert("delete channel failed");
      return;
    }
    navigation.goBack();
  }
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
      }}
    >
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
            navigation.navigate("ChannelOverview", {
              channelId: channelId,
              workspaceId: workspaceId,
            })
          }
        >
          Channel Overview
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
            message: "are you sure want to delete this Channel",
            OKText: "Delete",
            onPressOK: onPressDelete,
          })}
        >
          Delete Channel
        </Button>
      </View>
    </View>
  );
}
