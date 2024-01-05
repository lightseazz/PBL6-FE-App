import { general } from "../../styles/styles";
import { useState } from "react";
import createChannelApi from "../../api/channelApi/createChannel.api";

import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from "react-native";
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
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { getShortDate, getShortDatetime, successStatusCodes } from "../../utils/common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import createMeetingApi from "../../api/meetingApi/createMeeting.api";

export default function CreateMeeting({ navigation, route }) {
  const { workspaceId, channels, setChannels, setSnackBarChannel } = route.params;
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });

  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());

  const onChangeTimeStart = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTimeStart(currentDate);
  };
  const onChangeTimeEnd = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTimeEnd(currentDate);
  };
  const showMode = (currentMode, type) => {
    DateTimePickerAndroid.open({
      value: type == "timeStart" ? timeStart : timeEnd,
      onChange: type == "timeStart" ? onChangeTimeStart : onChangeTimeEnd,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepickerTimeStart = () => {
    showMode('date', 'timeStart');
  };

  const showTimepickerTimeStart = () => {
    showMode('time', 'timeStart');
  };

  const showDatepickerTimeEnd = () => {
    showMode('date', 'timeEnd');
  };

  const showTimepickerTimeEnd = () => {
    showMode('time', 'timeEnd');
  };


  const onChangeName = (text) => {
    setName(text);
  };

  const onChangeSessionId = (text) => {
    setSessionId(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  }

  const onChangeDescription = (text) => {
    setDescription(text);
  };

  async function onPressCreate() {
    try {
      setClicked(true);
      if (sessionId == "") {
        setSnackBar({ isVisible: true, message: "meeting session id is empty", type: "failed" });
        setClicked(false);
        return;
      }
      if (name == "") {
        setSnackBar({ isVisible: true, message: "meeting name is empty", type: "failed" });
        setClicked(false);
        return;
      }
      const response = await createMeetingApi(name, sessionId, password,
        timeStart, timeEnd, description, workspaceId);
      console.log(response.status);
      if (!successStatusCodes.includes(String(response.status))) {
        setSnackBar({ isVisible: true, message: "create new meeting failed", type: "failed" });
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
      setSnackBarChannel({ isVisible: true, message: "create new meeting success", type: "success" });
      setClicked(false);
    } catch (error) {
      console.log(error);
      setSnackBar({ isVisible: true, message: "create meeting failed", type: "failed" });
    }
  }


  return (
    <>
      <View style={general.centerView}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, marginTop: 40 }}
        ></View>
        <TextInput
          {...textInputColor}
          label="Session id"
          mode="outlined"
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangeSessionId}
        />
        <TextInput
          {...textInputColor}
          label="Meeting name"
          mode="outlined"
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangeName}
        />
        <TextInput
          {...textInputColor}
          label="Password"
          mode="outlined"
          secureTextEntry
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangePassword}
        />
        <TextInput
          {...textInputColor}
          label="description"
          mode="outlined"
          style={{ marginBottom: 20, width: "80%", backgroundColor: "white" }}
          multiline={true}
          numberOfLines={4}
          onChangeText={onChangeDescription}
        />
        <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Text style={{ fontSize: 18 }}>Time Start: </Text>
          <Text style={{ fontSize: 14 }}> {getShortDatetime(timeStart)}</Text>
          <TouchableOpacity onPress={showDatepickerTimeStart}>
            <Icon name="calendar" size={23} style={{ marginLeft: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimepickerTimeStart}>
            <Icon name="clock" size={23} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>

        <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ fontSize: 18 }}>Time End  : </Text>
          <Text style={{ fontSize: 14 }}> {getShortDatetime(timeEnd)}</Text>
          <TouchableOpacity onPress={showDatepickerTimeEnd}>
            <Icon name="calendar" size={23} style={{ marginLeft: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={showTimepickerTimeEnd}>
            <Icon name="clock" size={23} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>

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
