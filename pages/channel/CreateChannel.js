import { general } from "../../styles/styles";
import { useState } from "react";
import createChannelApi from "../../api/channelApi/createChannel.api";

import { View, StyleSheet, StatusBar, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import {
  buttonColor,
  textInputColor,
  cancelButtonColor,
} from "../../styles/colorScheme";
import getAllChannelApi from "../../api/channelApi/getAllChannel.api";
import * as SecureStore from "expo-secure-store";
import * as signalR from "@microsoft/signalr";
import { setConnectionChatChannel } from "../../globalVar/global";
import StatusSnackBar from "../../components/StatusSnackBar";
import { successStatusCodes } from "../../utils/common";

export default function CreateChannel({ navigation, route }) {
  const { workspaceId, channels, setChannels, setSnackBarChannel } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clicked, setClicked] = useState(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });

  const onChangeName = (text) => {
    setName(text);
  };

  const onChangeDescription = (text) => {
    setDescription(text);
  };

  async function onPressCreate() {
    try {
      setClicked(true);
      if (name == "") {
        setSnackBar({ isVisible: true, message: "channel name is empty", type: "failed" });
        setClicked(false);
        return;
      }
      const response = await createChannelApi(name, description, workspaceId);
      if (!successStatusCodes.includes(String(response.status))) {
        setSnackBar({ isVisible: true, message: "you are not authorized to create channel", type: "failed" });
        setClicked(false);
        return;
      }

      const channels = await getAllChannelApi(workspaceId);
      setChannels([...channels]);

      async function connectHub() {
        let baseUrl = "https://api.firar.live";
        const userToken = await SecureStore.getItemAsync("userToken");
        let connection = new signalR.HubConnectionBuilder()
          .withUrl(`${baseUrl}/chatHub?access_token=${userToken}`)
          .withAutomaticReconnect()
          .build()

        connection.on("Error", function (message) {
          console.log("signalR Connection Error: ", message);
        });
        connection.start().then(function () {
        })
          .catch(function (err) {
            return console.error(err.toString());
          });
        setConnectionChatChannel(connection);
      }
      connectHub();

      navigation.goBack();
      setSnackBarChannel({ isVisible: true, message: "create new channel success", type: "success" });
      setClicked(false);
    } catch (error) {
      console.log(error);
      setSnackBar({ isVisible: true, message: "create channel failed", type: "failed" });
    }
  }

  return (
    <>
      <View style={general.centerView}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
        ></View>
        <TextInput
          {...textInputColor}
          label="Channel name"
          mode="outlined"
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangeName}
        />
        <TextInput
          {...textInputColor}
          label="description"
          mode="outlined"
          style={{ marginBottom: 20, width: "80%", backgroundColor: "white" }}
          multiline={true}
          numberOfLines={8}
          onChangeText={onChangeDescription}
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
            onPress={onPressCreate}
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
  divider: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.8,
  },
  headerText: { marginBottom: 20, fontSize: 18 },
});
