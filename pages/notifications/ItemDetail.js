import { View, StyleSheet, Text, StatusBar, Alert } from "react-native";
import { Avatar, Button, Divider } from "react-native-paper";
import acceptWpApi from "../../api/workspaceApi/acceptWp.api";
import declineWpApi from "../../api/workspaceApi/declineWp.api";
import { getShortDatetimeSendAt, successStatusCodes } from "../../utils/common";
import { useState } from "react";
import StatusSnackBar from "../../components/StatusSnackBar";
import deleteNotiApi from "../../api/notification/deleteNoti.api";

const icon = "https://cdn-icons-png.flaticon.com/512/3119/3119338.png";



export default function ItemDetail({ navigation, route }) {
  const { id, title, content, createdAt, isRead, type, data, setSnackBar, setNotis } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  let dataJson = JSON.parse(data);
  let dataDetailJson = JSON.parse(dataJson.Detail);
  function AcceptWsp() {
    return (
      <Button
        loading={isLoading}
        disabled={isLoading}
        mode="contained"
        style={{ backgroundColor: 'green', width: '30%' }}
        onPress={acceptWsp}
      >Accept</Button>
    )
  }
  function DeclineWsp() {
    return (
      <Button
        loading={isLoading}
        disabled={isLoading}
        mode="contained"
        style={{ backgroundColor: 'red', width: '30%' }}
        onPress={declineWsp}
      >Decline</Button>
    )
  }

  async function deleteNoti() {
    try {
      const response = await deleteNotiApi([id]);
      setNotis(notis => {
        const resetNotis = notis.filter(noti => noti.id != id);
        return [...resetNotis];
      });
    } catch {

    }

  }

  async function acceptWsp() {
    try {
      setIsLoading(true);
      const response = await acceptWpApi(dataDetailJson.GroupId);
      if (successStatusCodes.includes(String(response.status))) {
        deleteNoti();
        navigation.goBack();
        setSnackBar({ isVisible: true, message: "you join this workspace successfully", type: "success" });
        setIsLoading(false);
      }
      else {
        deleteNoti();
        navigation.goBack();
        setSnackBar({ isVisible: true, message: "you've joined this workspace", type: "failed" });
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  }
  async function declineWsp() {
    try {
      setIsLoading(true);
      const response = await declineWpApi(dataDetailJson.GroupId);
      if (successStatusCodes.includes(String(response.status))) {
        deleteNoti();
        navigation.goBack();
        setSnackBar({ isVisible: true, message: "you decline this workspace", type: "success" });
        setIsLoading(false);
      }
      else {
        deleteNoti();
        navigation.goBack();
        setSnackBar({ isVisible: true, message: "you had declined this workspace", type: "failed" })
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.secondContainer}>
        <Avatar.Image
          style={{ borderRadius: 10, backgroundColor: "white" }}
          size={40}
          source={{
            uri: icon,
          }}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{getShortDatetimeSendAt(createdAt)}</Text>
        </View>
      </View>
      <Divider bold={true} style={styles.divider} />
      <Text style={styles.text}>{content}</Text>
      {type == 6 ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
          <AcceptWsp />
          <DeclineWsp />
        </View>
      ) : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: "5%",
  },
  secondContainer: {
    flexDirection: "row",
    width: "100%",
  },
  timeContainer: {
    flex: 1,
    justifyContent: "center",
  },
  leftContainer: {
    marginLeft: 10,
  },
  typeText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  title: {
    marginBottom: 20,
    color: "#1a69a6",
    fontSize: 18,
  },
  timeText: { fontSize: 12, alignSelf: "flex-end" },
  divider: {
    marginTop: 20,
    borderWidth: 0.8,
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
  },
});
