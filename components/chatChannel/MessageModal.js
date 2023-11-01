import { Modal } from "react-native";
import { Text, View, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MessageModal({ modalVisible, setModalVisible }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible["message"]}
      onRequestClose={() =>
        setModalVisible({
          message: false,
          emoji: false,
        })
      }
    >
      <View style={styles.bottomedView}>
        <View style={styles.modalView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() =>
              setModalVisible({
                message: false,
                emoji: false,
              })
            }
          >
            <Icon size={30} name="minus-thick" style={styles.close} />
          </Pressable>
          <TouchableOpacity style={styles.component}>
            <Icon size={24} name="pencil" style={styles.icon} />
            <Text>Edit Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.component}>
            <Icon size={24} name="reply" style={styles.icon} />
            <Text>Reply</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.component}>
            <Icon size={24} name="content-copy" style={styles.icon} />
            <Text>Copy Text</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.component}>
            <Icon size={24} name="delete" style={styles.icon} />
            <Text>Delete Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.component}>
            <Icon size={24} name="pin" style={styles.icon} />
            <Text>Pin Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomedView: {
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
  },
  component: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  icon: { marginRight: 20 },
  close: {
    alignSelf: "center",
  },
});
