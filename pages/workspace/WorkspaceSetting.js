import { View } from "react-native";
import { Button } from "react-native-paper";
import ConfirmAlert from "../ConfirmAlert";
import deleteWpApi from "../../api/workspaceApi/deleteWp.api";
import { Alert } from "react-native";
import { buttonColor } from "../../styles/colorScheme";
import { userSignedIn } from "../../globalVar/global";
import getWpbyIdApi from "../../api/workspaceApi/getWpbyId.api";
import { useEffect, useRef, useState } from "react";
import StatusSnackBar from "../../components/StatusSnackBar";
import leaveWpApi from "../../api/workspaceApi/leaveWp.api";
import { successStatusCodes } from "../../utils/common";

export default function WorkspaceSetting({ route, navigation }) {
  const { workspaceId, setSnackBarWpList } = route.params;
  const [snackBar, setSnackBar] = useState({ isVisible: false, message: "", type: "blank" });
  async function onPressDelete() {
    try {
      const response = await deleteWpApi(workspaceId);
      if (successStatusCodes.includes(String(response.status))) {
        navigation.navigate("WorkspaceList");
        setSnackBarWpList({ isVisible: true, message: "Delete workspace success", type: "success" });
        return;
      }
      setSnackBar({ isVisible: true, message: "You are unauthorized to delete this workspace", type: "failed" });
    } catch {

      setSnackBar({ isVisible: true, message: "failed delete this workspace", type: "failed" });
    }
  }
  async function onLeave() {
    try {
      const response = await leaveWpApi(workspaceId);
      console.log(response.status);
      if (successStatusCodes.includes(String(response.status))) {
        navigation.navigate("WorkspaceList");
        setSnackBarWpList({ isVisible: true, message: "Leave workspace success", type: "success" });
        return;
      }
      setSnackBar({ isVisible: true, message: "You are owner, cannot leave this workspace", type: "failed" });
    } catch {
      setSnackBar({ isVisible: true, message: "failed leave this workspace", type: "failed" });
    }
  }
  return (
    <>
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
            style={{ marginTop: 20 }}
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
          <Button
            mode="contained"
            style={{ backgroundColor: "#cc0000", marginBottom: 20 }}
            onPress={ConfirmAlert({
              title: "Confirm Leave",
              message: "are you sure want to leave this Workspace",
              OKText: "Leave",
              onPressOK: onLeave,
            })}
          >
            Leave
          </Button>
        </View>
      </View>
      <StatusSnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
    </>
  );
}
