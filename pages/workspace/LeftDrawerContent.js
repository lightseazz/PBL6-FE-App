import { View, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { WorkspaceIdContext } from "../../hook/WorkspaceContext";
import { currentChannelIdContext } from "../../hook/ChannelContext";
import { useContext, useEffect, useState } from "react";
import { Text, FlatList } from "react-native";
import getWpbyIdAPi from "../../api/workspaceApi/getWpbyId.api";
import getAllChannelApi from "../../api/channelApi/getAllChannel.api";
import { buttonColor } from "../../styles/colorScheme";

export default function LeftDrawerContent({ navigation, setSnackBarWpList }) {
  const workspaceId = useContext(WorkspaceIdContext);
  const {
    currentChannelId,
    setCurrentChannelId,
    channels,
    setChannels,
    setSnackBarChannel,
  } = useContext(currentChannelIdContext);
  const [workspaceName, setWorkspaceName] = useState("");
  useEffect(
    function () {
      if (!currentChannelId) {
        try {
          const getWp = async () => {
            const workspace = await getWpbyIdAPi(workspaceId);
            setWorkspaceName(workspace.name);
          };
          const renderChannels = async () => {
            const response = await getAllChannelApi(workspaceId);
            setChannels([...response]);
            if (response.length > 0) {
              setCurrentChannelId(response[0].id);
            }
          };
          getWp();
          renderChannels();
        } catch (error) { }
      }
    },
    [currentChannelId]
  );
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 7, marginTop: 50, width: "80%" }}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 20,
            alignItems: "center",
            borderBottomWidth: 0.5,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("WorkspaceList")}
          >
            <Icon name="keyboard-backspace" size={24}></Icon>
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, fontSize: 20 }}>{workspaceName}</Text>
        </View>
        <Button
          {...buttonColor}
          mode="contained"
          icon="plus"
          style={{ marginBottom: 20 }}
          onPress={() =>
            navigation.navigate("CreateChannel", {
              workspaceId: workspaceId,
              setChannels: setChannels,
              setSnackBarChannel: setSnackBarChannel,
            })
          }
        >
          Create new channel
        </Button>
        <View style={{ flex: 1 }}>
          <FlatList
            data={channels}
            renderItem={({ item }) => (
              <Channel
                id={item.id}
                name={item.name}
                category={item.category}
                currentChannelId={currentChannelId}
                setCurrentChannelId={setCurrentChannelId}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: 40,
          flexDirection: "column-reverse",
          width: "80%",
        }}
      >
        <Button
          {...buttonColor}
          mode="contained"
          icon="cog-outline"
          style={{ marginBottom: 20 }}
          onPress={() =>
            navigation.navigate("WorkspaceSetting", {
              workspaceId: workspaceId,
              setSnackBarWpList: setSnackBarWpList,
            })
          }
        >
          Setting
        </Button>
        <Button
          {...buttonColor}
          mode="contained"
          icon="account-plus"
          style={{ marginBottom: 20 }}
          onPress={() =>
            navigation.navigate("WorkspaceInvite", {
              workspaceId: workspaceId,
            })
          }
        >
          invite people
        </Button>
      </View>
    </View>
  );
}

function Channel({ id, name, category, currentChannelId, setCurrentChannelId }) {
  let iconName = "pound";
  if (category == "4") iconName = "video-outline";
  return (
    <Button
      textColor="black"
      buttonColor={id == currentChannelId ? "#D0D0D0" : "white"}
      mode={id == currentChannelId ? "contained-tonal" : "text"}
      icon={iconName}
      style={{ marginBottom: 20 }}
      contentStyle={{ justifyContent: "flex-start" }}
      onPress={() => setCurrentChannelId(id)}
    >
      {name}
    </Button>
  );
}
