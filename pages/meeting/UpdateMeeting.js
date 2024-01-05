import { general } from "../../styles/styles";
import { useState } from "react";

import { View, StyleSheet, StatusBar, Text, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper";
import {
  buttonColor,
  textInputColor,
  cancelButtonColor,
} from "../../styles/colorScheme";
import * as SecureStore from "expo-secure-store";
import * as signalR from "@microsoft/signalr";
import StatusSnackBar from "../../components/StatusSnackBar";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { getShortDate, getShortDatetime, successStatusCodes } from "../../utils/common";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import createMeetingApi from "../../api/meetingApi/createMeeting.api";
import getAllMeetingWpApi from "../../api/meetingApi/getAllMeetingWp.api";
import updateMeetingApi from "../../api/meetingApi/updateMeeting.api";

export default function UpdateMeeting({ navigation, route }) {
  const { workspaceId, meeting } = route.params;
  const [name, setName] = useState(meeting?.name);
  const [sessionId, setSessionId] = useState(meeting?.sessionId);
  const [description, setDescription] = useState(meeting?.description);
  const [password, setPassword] = useState(meeting?.password);
  const [clicked, setClicked] = useState(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });

  const [timeStart, setTimeStart] = useState(new Date(meeting?.timeStart));
  const [timeEnd, setTimeEnd] = useState(new Date(meeting?.timeEnd));

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


  const onChangePassword = (text) => {
    setPassword(text);
  }

  const onChangeDescription = (text) => {
    setDescription(text);
  };

  async function onPressUpdate() {
    try {
      setClicked(true);
      if (name == "") {
        setSnackBar({ isVisible: true, message: "meeting name is empty", type: "failed" });
        setClicked(false);
        return;
      }
      const memberIds = meeting.participants.map(member => member.id);
      const response = await updateMeetingApi(meeting.id, name, password,
        timeStart, timeEnd, description, memberIds, workspaceId);

      if (!successStatusCodes.includes(String(response.status))) {
        setSnackBar({ isVisible: true, message: "update meeting failed", type: "failed" });
        setClicked(false);
        return;
      }

      setSnackBar({ isVisible: true, message: "update meeting success", type: "success" });

      setClicked(false);
    } catch (error) {
      console.log(error);
      setSnackBar({ isVisible: true, message: "update meeting failed", type: "failed" });
    }
  }

  return (
    <>
      <View style={general.centerView}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, marginTop: 40 }}
        ></View>
        <TextInput
          disabled
          value={sessionId}
          {...textInputColor}
          label="Session id"
          mode="outlined"
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
        />
        <TextInput
          value={name}
          {...textInputColor}
          label="Meeting name"
          mode="outlined"
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangeName}
        />
        <TextInput
          value={password}
          {...textInputColor}
          label="Password"
          mode="outlined"
          secureTextEntry
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangePassword}
        />
        <TextInput
          value={description}
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
  divider: {
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 0.8,
  },
  headerText: { marginBottom: 20, fontSize: 18 },
});
