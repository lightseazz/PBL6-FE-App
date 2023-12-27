import { View } from "react-native";
import { Button } from "react-native-paper";
import ConfirmAlert from "../ConfirmAlert";
import deleteChannelApi from "../../api/channelApi/deleteChannel.api";
import { Alert } from "react-native";
import { buttonColor } from "../../styles/colorScheme";
import getAllChannelApi from "../../api/channelApi/getAllChannel.api";

export default function ChannelSetting({ route, navigation }) {
  const { channelId, workspaceId, setChannels, setCurrentChannelId } = route.params;
  async function onPressDelete() {
    const response = await deleteChannelApi(workspaceId, channelId);
    if (response.status != 200) {
      Alert.alert("delete channel failed");
      return;
    }
    const allChannels = await getAllChannelApi(workspaceId);
    setChannels([...allChannels]);
    setCurrentChannelId(allChannels[0].id);
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
        <Button
          style={{ marginTop: 20 }}
          {...buttonColor}
          mode="elevated"
          onPress={() =>
            navigation.navigate("ChannelMemberManagement", {
              channelId: channelId,
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
