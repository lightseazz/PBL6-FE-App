import { general } from "../../styles/styles";
import { useState } from "react";
import { Alert } from "react-native";
import updateChannelApi from "../../api/channelApi/updateChannel.api";

import { View, StyleSheet, StatusBar, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import getChannelById from "../../api/channelApi/getChannelById.api";
import { useEffect } from "react";
import {
  buttonColor,
  textInputColor,
  cancelButtonColor,
} from "../../styles/colorScheme";
import StatusSnackBar from "../../components/StatusSnackBar";
import { successStatusCodes } from "../../utils/common";

export default function ChannelOverview({ navigation, route }) {
  const { channelId, workspaceId } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clicked, setClicked] = useState(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });

  useEffect(function () {
    try {
      const getWorkspace = async () => {
        const channel = await getChannelById(channelId);
        setName(channel.name);
        setDescription(channel.description);
      };
      getWorkspace();
    } catch (error) {
      setSnackBar({ isVisible: true, message: "get channel failed", type: "failed" });
    }
  }, []);
  const onChangeName = (text) => {
    setName(text);
  };

  const onChangeDescription = (text) => {
    setDescription(text);
  };

  async function onPressUpdate() {
    try {
      setClicked(true);
      if (name == "") {
        setSnackBar({ isVisible: true, message: "channel name is empty", type: "failed" });
        setClicked(false);
        return;
      }
      const response = await updateChannelApi(
        workspaceId,
        channelId,
        name,
        description
      );
      if (!successStatusCodes.includes(String(response.status))) {
        setSnackBar({ isVisible: true, message: "you are not authorized to update this channel", type: "failed" });
        setClicked(false);
        return;
      }
      setSnackBar({ isVisible: true, message: "update this channel successfully", type: "success" });
      setClicked(false);
    } catch (error) {
      setSnackBar({ isVisible: true, message: "update this channel failed", type: "failed" });
      setClicked(false);
    }
  }

  return (
    <>
      <View style={general.centerView}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
        >
          <View style={{ flex: 1, alignItems: "center" }}></View>
        </View>
        <TextInput
          {...textInputColor}
          label="channel name"
          mode="outlined"
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangeName}
          value={name}
        />
        <TextInput
          {...textInputColor}
          label="description"
          mode="outlined"
          style={{ marginBottom: 20, width: "80%", backgroundColor: "white" }}
          multiline={true}
          numberOfLines={8}
          onChangeText={onChangeDescription}
          value={description}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end",
            marginRight: 40,
          }}
        >
          <Button
            {...cancelButtonColor}
            mode="contained"
            style={{ width: "30" }}
            onPress={() => navigation.goBack()}
            disabled={clicked}
          >
            Cancel
          </Button>
          <Button
            {...buttonColor}
            mode="contained"
            style={{ marginLeft: 20, marginRight: 10, width: "30" }}
            onPress={onPressUpdate}
            disabled={clicked}
            loading={clicked}
          >
            Ok
          </Button>
        </View>
      </View>
      <StatusSnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  imageTouchable: {
    marginLeft: 50,
    borderWidth: 1,
    padding: 3,
    borderRadius: 5,
    borderStyle: "dashed",
  },
  saveImage: { width: "60%", borderRadius: 8 },
  divider: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.8,
  },
  headerText: { marginBottom: 20, fontSize: 18 },
});
