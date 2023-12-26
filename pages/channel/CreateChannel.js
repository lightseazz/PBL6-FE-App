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

export default function CreateChannel({ navigation, route }) {
  const { workspaceId, channels, setChannels } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);

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
        setError("Channel name is empty");
        setClicked(false);
        return;
      }
      const response = await createChannelApi(name, description, workspaceId);
      if (response.status != 200) {
        setError("create channel failed");
        setClicked(false);
        return;
      }

      const channels = await getAllChannelApi(workspaceId);
			setChannels([...channels]);

      navigation.goBack();
      setClicked(false);
    } catch (error) {
      console.log(error);
      setError("create channel failed");
    }
  }

  return (
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
      <Text style={{ color: "red", marginBottom: 20 }}>{error}</Text>
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
