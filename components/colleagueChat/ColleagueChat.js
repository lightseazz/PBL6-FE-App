import { View, StatusBar, FlatList, StyleSheet } from "react-native";
import Colleague from "./Colleague";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import AddModal from "./AddModal";

const avatar =
  "https://images.unsplash.com/photo-1529397938791-2aba4681454f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const tempData = [];
for (let i = 1; i <= 5; i++) {
  tempData.push({
    id: i,
    avatar: avatar,
    username: "John David",
    time: "24/10 12:00 PM",
    previewText: "to day is good day ...",
  });
}
export default function ColleagueChat({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        style={styles.searchInput}
        label="Search User"
        left={<TextInput.Icon icon="magnify" />}
      />
      <Button
        icon="plus"
        mode="contained-tonal"
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        Add
      </Button>
      <FlatList
        data={tempData}
        renderItem={({ item }) => (
          <Colleague
            navigation={navigation}
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
    marginTop: StatusBar.currentHeight + 10,
    padding: 15,
  },
  searchInput: {
    width: "100%",
    alignSelf: "center",
  },
  addButton: {
    width: "30%",
    borderRadius: 10,
    marginTop: 15,
    alignSelf: "flex-end",
  },
  modal: { height: 300, backgroundColor: "white" },
});
