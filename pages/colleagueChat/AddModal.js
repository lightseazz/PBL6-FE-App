import { Modal, View, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Searchbar, Button } from "react-native-paper";

export default function AddModal({ modalVisible, setModalVisible }) {
  return (
    <Modal
      animationType="fade"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.bottomedView}>
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
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomedView: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "column-reverse",
    flex: 1,
  },
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
  close: {
    alignSelf: "center",
  },
  searchInput: {
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    backgroundColor: "white",
  },
});
