import { View, FlatList, StyleSheet } from "react-native";
import Colleague from "./Colleague";
import { Button, Searchbar } from "react-native-paper";
import { useEffect, useState } from "react";
import AddModal from "./AddModal";
import { buttonColor, textInputColor } from "../../styles/colorScheme";
import * as SecureStore from "expo-secure-store"
import * as signalR from "@microsoft/signalr"
import { useIsFocused } from "@react-navigation/native";
import { setConnectionChatColleague } from "../../globalVar/global";
import getUsersConversationApi from "../../api/chatApi/getUsersConversation.api";
import { FlashList } from "@shopify/flash-list";

export default function ColleagueChat({ navigation }) {
  const [colleagues, setColleagues] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
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
    async function getInitColleagues() {
      const colleagues = await getUsersConversationApi("", 0, 5);
      setColleagues([...colleagues])
    }
    
    if (isFocused == true)
      connectHub();
    getInitColleagues();
  }, [isFocused])

  async function addColleagues() {
    setModalVisible(true);

  }
  return (
    <View style={styles.container}>
      <Searchbar
        {...textInputColor}
        mode="bar"
        style={styles.searchInput}
        placeholder="Search User"
        onChangeText={setSearch}
      />
      <Button
        {...buttonColor}
        icon="plus"
        mode="contained-tonal"
        style={styles.addButton}
        onPress={addColleagues}
      >
        Add
      </Button>
      <FlashList
        estimatedItemSize={200}
        data={colleagues}
        renderItem={({ item }) => (
          <Colleague
            navigation={navigation}
            id={item.id}
            avatar={item.avatar}
            name={item.name}
            lastMessage={item.lastMessage}
            lastMessageTime={item.lastMessageTime}
            lastMessageSender={item.lastMessageSender}
						isOnline={item.isOnline}
          />
        )}
      />
      <AddModal
				navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        colleagues={colleagues}
        setColleagues={setColleagues}
      />

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
