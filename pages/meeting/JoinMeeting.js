import { general } from "../../styles/styles";
import { useState } from "react";
import { Alert } from "react-native";
import updateWpApi from "../../api/workspaceApi/updateWp.api";
import updateWpAvatarApi from "../../api/workspaceApi/updateWpAvatar.api";

import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import getWpbyIdApi from "../../api/workspaceApi/getWpbyId.api";
import { useEffect } from "react";
import {
  buttonColor,
  cancelButtonColor,
  textInputColor,
} from "../../styles/colorScheme";
import StatusSnackBar from "../../components/StatusSnackBar";
import joinMeetingApi from "../../api/meetingApi/joinMeeting.api";
import { successStatusCodes } from "../../utils/common";

export default function JoinMeeting({ navigation, route }) {
  const { workspaceId } = route.params;
  const [sessionId, setSessionId] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });

  const onChangeSessionId = (text) => {
    setSessionId(text);
  };

  const onChangePassword = (text) => {
    setPassword(text);
  };

  async function onPressJoin() {
    try {
      setClicked(true);
      if (sessionId == "") {
        setSnackBar({ isVisible: true, message: "Session Id cannot be empty", type: "failed" });
        setClicked(false);
        return;
      }
      const response = await joinMeetingApi(workspaceId, sessionId, password);
      console.log(response);
      if (typeof response != "string" || !response.includes("meeting")) {
        setSnackBar({ isVisible: true, message: "join meeting failed", type: "failed" });
        setClicked(false);
        return;
      }
      setClicked(false);
			navigation.goBack();
    } catch (error) {
      setSnackBar({ isVisible: true, message: "join meeting failed", type: "failed" });
      setClicked(false);
    }
  }

  return (
    <>
      <View style={general.centerView}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
        >
        </View>
        <TextInput
          {...textInputColor}
          label="Session Id"
          mode="outlined"
          style={{ marginBottom: 30, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangeSessionId}
          value={sessionId}
        />
        <TextInput
          {...textInputColor}
          secureTextEntry
          label="password"
          mode="outlined"
          style={{ marginBottom: 20, width: "80%", backgroundColor: "white" }}
          onChangeText={onChangePassword}
          value={password}
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
            onPress={onPressJoin}
            disabled={clicked}
            loading={clicked}
          >
            Join
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
