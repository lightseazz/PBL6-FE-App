import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { FAB, Text } from "react-native-paper";
import { general } from "../../styles/styles";
import getAllWpApi from "../../api/workspaceApi/getAllWp.api";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

export default function WorkspaceList({ navigation }) {
  const [workspaceList, setWorkspaceList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(
    function () {
      if (isFocused) {
        async function renderWorkspaceList() {
          const userToken = await SecureStore.getItemAsync("userToken");
          const response = await getAllWpApi(userToken);
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
        label="create Workspace"
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          left: 0,
          bottom: 0,
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
        navigation.navigate("Drawer", {
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

        <Text style={{ marginTop: 10 }}>{numberOfMembers} members</Text>
      </View>
    </TouchableOpacity>
  );
}
