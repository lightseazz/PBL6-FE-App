import { View, StyleSheet, Pressable, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar, Button, Avatar } from "react-native-paper";
import getUserByIdApi from "../../api/userApi/getUserById.api";
import getUserByEmailApi from "../../api/userApi/getUserByEmail.api";
import { FlashList } from "@shopify/flash-list";
import { useState } from "react";
import { buttonColor } from "../../styles/colorScheme";


export default function AddModal({ modalVisible, setModalVisible, colleagues, setColleagues, navigation }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function findColleagues() {
    setIsLoading(true);
    const users = await getUserByEmailApi(search, 10);
    if (!users.length) {
      setUsers([]);
      setIsLoading(false);
      return;
    };
    setUsers([...users]);
    setIsLoading(false);
  }
  function Users({ id, avatar, email, name }) {
    function addUser() {
      navigation.navigate("ChatColleague", {
        colleagueId: id,
      })
      setModalVisible(false);
    }
    return (
      <TouchableOpacity style={styles.usersContainer} onPress={addUser}>
        <View style={{ flexDirection: 'row' }}>
          <Avatar.Image
            size={40}
            source={{
              uri: avatar,
            }}
          />
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.usersName}>{name}</Text>
            <Text style={styles.usersEmail}>{email}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <Modal
      onBackdropPress={() => setModalVisible(false)}
      backdropColor="black"
      hideModalContentWhileAnimating={true}
      backdropTransitionOutTiming={0}
      transparent={true}
      isVisible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(false)}
        >
          <Icon size={30} name="minus-thick" style={styles.close} />
        </Pressable>
        <Searchbar
          mode="bar"
          style={styles.searchInput}
          placeholder="please enter email or username"
          onChangeText={setSearch}
        />
        <Button
          {...buttonColor}
          mode="contained-tonal"
          style={styles.addButton}
          onPress={findColleagues}
        >
          Find
        </Button>
        {isLoading ? <ActivityIndicator size={25} color="black" />
          : <></>}
        <FlashList
          estimatedItemSize={200}
          data={users}
          renderItem={({ item }) => (
            <Users
              id={item.id}
              avatar={item.picture}
              name={(item.firstName || "") + " " + (item.lastName || "")}
              email={item.email}
            />
          )}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minHeight: 350,
  },
  addButton: {
    width: 110,
    borderRadius: 10,
    marginTop: 15,
    marginRight: 20,
    alignSelf: "flex-end",
  },

  close: {
    alignSelf: "center",
  },
  searchInput: {
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    backgroundColor: "white",
  },
  usersContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.4,
  },
  usersName: {

  },
  usersEmail: {
    fontStyle: 'italic',
  }
});
