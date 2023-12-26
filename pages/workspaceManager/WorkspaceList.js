import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { FAB, Text } from "react-native-paper";
import { general } from "../../styles/styles";
import getAllWpApi from "../../api/workspaceApi/getAllWp.api";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { setGlobalUser } from "../../globalVar/global";
import { setConnectionChatChannel } from "../../globalVar/global";
import * as SecureStore from "expo-secure-store";
import * as signalR from "@microsoft/signalr";

export default function WorkspaceList({ navigation }) {
  const [workspaceList, setWorkspaceList] = useState([]);
  const isFocused = useIsFocused();

  // hub connection chat channel
  useEffect(function () {

  }, [isFocused])

  useEffect(
    function () {
      if (isFocused) {
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
        async function renderWorkspaceList() {
          const response = await getAllWpApi();
          setWorkspaceList(
            response.map((workspace) => ({
              id: workspace.id,
              name: workspace.name,
              avatarUrl: workspace.avatarUrl,
              numberOfMembers: workspace.members.length,
            }))
          );
        }
        renderWorkspaceList();
        setGlobalUser();
        connectHub();
      }
    },
    [isFocused]
  );
  return (
    <View style={general.containerWithOutStatusBar}>
      <FlatList
        data={workspaceList}
        renderItem={({ item }) => (
          <WorkspaceCard
            id={item.id}
            name={item.name}
            avatarUrl={item.avatarUrl}
            numberOfMembers={item.numberOfMembers}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <FAB
        color="white"
        label="create Workspace"
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
        }}
        onPress={() => navigation.navigate("WorkspaceCreate")}
      />
    </View>
  );
}

function WorkspaceCard({ id, name, avatarUrl, navigation, numberOfMembers }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("LeftDrawerScreen", {
          workspaceId: id,
        })
      }
    >
      <View
        style={{
          marginBottom: 30,
          borderWidth: 1.5,
          borderRadius: 10,
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: avatarUrl }}
            style={{ width: "20%", aspectRatio: 1, borderRadius: 10 }}
          />
          <Text style={{ marginLeft: 10, fontSize: 15 }}>{name}</Text>
        </View>

        <Text style={{ marginTop: 10, color: "grey" }}>
          {numberOfMembers} members
        </Text>
      </View>
    </TouchableOpacity>
  );
}
