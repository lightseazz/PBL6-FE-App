import { View } from "react-native";
import { Button } from "react-native-paper";
import ConfirmAlert from "../ConfirmAlert";
import deleteChannelApi from "../../api/channelApi/deleteChannel.api";
import { Alert } from "react-native";
import { buttonColor } from "../../styles/colorScheme";
import getAllChannelApi from "../../api/channelApi/getAllChannel.api";
import { useState } from "react";
import StatusSnackBar from "../../components/StatusSnackBar";
import { successStatusCodes } from "../../utils/common";
import leaveChannelApi from "../../api/channelApi/leaveChannel.api";

export default function ChannelSetting({ route, navigation }) {
  const { channelId, workspaceId, setChannels, setCurrentChannelId, setSnackBarChannel } = route.params;
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });

  async function onPressDelete() {
    try {
      const response = await deleteChannelApi(workspaceId, channelId);
      if (!successStatusCodes.includes(String(response.status))) {
        setSnackBar({ isVisible: true, message: "you are not authorized to delete this channel", type: "failed" });
        return;
      }
      const allChannels = await getAllChannelApi(workspaceId);
      setChannels([...allChannels]);
      setCurrentChannelId(allChannels[0].id);
      navigation.goBack();
      setSnackBarChannel({ isVisible: true, message: "delete channel success", type: "success" });
    } catch {

      setSnackBar({ isVisible: true, message: "failed delete this channel", type: "failed" });
    }
  }

  async function onPressLeave() {
    try {
      const response = await leaveChannelApi(workspaceId, channelId);
      if (!successStatusCodes.includes(String(response.status))) {
				console.log(response.status);
        setSnackBar({ isVisible: true, message: "you are owner of this channel cannot leave", type: "failed" });
        return;
      }
      const allChannels = await getAllChannelApi(workspaceId);
      setChannels([...allChannels]);
      setCurrentChannelId(allChannels[0].id);
      navigation.goBack();
      setSnackBarChannel({ isVisible: true, message: "leave channel success", type: "success" });
    } catch {

      setSnackBar({ isVisible: true, message: "failed leave this channel", type: "failed" });
    }
  }
  return (
    <>
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
          <Button
            mode="contained"
            style={{ backgroundColor: "#cc0000", marginBottom: 20 }}
            onPress={ConfirmAlert({
              title: "Confirm Deletion",
              message: "are you sure want to leave this Channel",
              OKText: "Leave",
              onPressOK: onPressLeave,
            })}
          >
            Leave Channel
          </Button>
        </View>
      </View>
      <StatusSnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
    </>
  );
}
