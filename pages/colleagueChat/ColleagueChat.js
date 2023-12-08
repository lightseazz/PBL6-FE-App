import { View, FlatList, StyleSheet } from "react-native";
import Colleague from "./Colleague";
import { Button, Searchbar } from "react-native-paper";
import { useState } from "react";
import AddModal from "./AddModal";
import { buttonColor, textInputColor } from "../../styles/colorScheme";

const avatar =
  "https://images.unsplash.com/photo-1529397938791-2aba4681454f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const hardCodeData = [{
  id: "5fbad663-f3f4-46cc-adf5-08dbe02fb464",
  avatar: avatar,
  username: "Tin",
  // time: "24/10 12:00 PM",
  // previewText: "to day is good day ...",
}];
export default function ColleagueChat({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
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
						userId = {item.id}
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
