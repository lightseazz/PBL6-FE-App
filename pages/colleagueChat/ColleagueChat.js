import { View, FlatList, StyleSheet } from "react-native";
import Colleague from "./Colleague";
import { Button, Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import { buttonColor, textInputColor } from "../../styles/colorScheme";
import * as SecureStore from "expo-secure-store"
import * as signalR from "@microsoft/signalr"
import { useIsFocused } from "@react-navigation/native";
import { connectionChatColleague } from "../../globalVar/global";
import { setConnectionChatColleague } from "../../globalVar/global";

const avatar =
  "https://images.unsplash.com/photo-1529397938791-2aba4681454f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
// const hardCodeIds = ["5fbad663-f3f4-46cc-adf5-08dbe02fb464", "998e45bf-fd1a-410a-f209-08dbf7e30ee4"];
const hardCodeData = [{
  id: "88400134-e738-47dd-9785-08dbfe952cc3",
  // avatar: avatar,
  username: "h1",
  // time: "24/10 12:00 PM",
  // previewText: "to day is good day ...",
},
{
  id: "5289bf4a-09c2-4c8a-9786-08dbfe952cc3",
  // avatar: avatar,
  username: "h2",
  // time: "24/10 12:00 PM",
  // previewText: "to day is good day ...",
},];
export default function ColleagueChat({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  useEffect(function () {
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
      setConnectionChatColleague(connection);
    }
    if (isFocused == true)
      connectHub();
  }, [isFocused])
  return (
    <View style={styles.container}>
      <Searchbar
        {...textInputColor}
        mode="bar"
        style={styles.searchInput}
        placeholder="Search User"
      />
      <Button
        {...buttonColor}
        icon="plus"
        mode="contained-tonal"
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        Add
      </Button>
      <FlatList
        data={hardCodeData}
        renderItem={({ item }) => (
          <Colleague
            navigation={navigation}
            colleagueId={item.id}
            avatar={item.avatar}
            username={item.username}
            time={item.time}
            previewText={item.previewText}
          />
        )}
      />
      <AddModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    flex: 1,
  },
  searchInput: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    borderWidth: 1,
  },
  addButton: {
    width: "30%",
    borderRadius: 10,
    marginTop: 15,
    alignSelf: "flex-end",
  },
  modal: { height: 300, backgroundColor: "white" },
});
