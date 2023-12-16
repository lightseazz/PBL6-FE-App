import { Modal } from "react-native";
import { Text, View, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { messageState } from "../../../utils/messageState";

export default function MessageModal(
  { connection, selectedMessageId, modalVisible, setModalVisible, messages, setMessages,
    richTextRef, userIdRef, selectedUserRef, setSendDisabled, setIsEdit, isSelectParentMessage, parentContent }
) {

  async function onDeleteMessage() {
    const response = await connection.invoke("DeleteMessageAsync", selectedMessageId, true).catch(function (err) {
      return console.error(err.toString());
    });
    if (typeof response == "string") {
      const deleteMessage = messages.find(message => message.id == response);
      deleteMessage.state = messageState.isDeleted;
    }
    setMessages([...messages]);
    setModalVisible({
      message: false,
      emoji: false,
    });
  }
  function onEditMessage() {
    if (isSelectParentMessage) onEditParent()
    else onEditChild()
  }
  function onEditParent() {
    richTextRef.current.initialFocus = true;
    richTextRef.current.setContentHTML(parentContent.html);
    richTextRef.text = parentContent.html;
    setSendDisabled(false);
    setModalVisible({
      message: false,
      emoji: false,
    });
    setIsEdit(true);
  }
  function onEditChild() {
    const editMessage = messages.find(message => message.id == selectedMessageId);
    richTextRef.current.initialFocus = true;
    if (editMessage.content && editMessage.content.html) {
      richTextRef.current.setContentHTML(editMessage.content.html);
    }
    else {
      richTextRef.current.setContentHTML("");
    }
    richTextRef.text = editMessage.content.html;
    setSendDisabled(false);
    setModalVisible({
      message: false,
      emoji: false,
    });
    setIsEdit(true);
  }
  return (
    <Modal
      animationType="fade"
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
          {selectedUserRef.current == userIdRef.current ? (
            <>
              <TouchableOpacity style={styles.component} onPress={onEditMessage}>
                <Icon size={24} name="pencil" style={styles.icon} />
                <Text>Edit Message</Text>
              </TouchableOpacity>
              {!isSelectParentMessage ? (
                <TouchableOpacity style={styles.component} onPress={onDeleteMessage}>
                  <Icon size={24} name="delete" style={styles.icon} />
                  <Text>Delete Message</Text>
                </TouchableOpacity>
              ) : <></>}
            </>
          ) : <></>}
          <TouchableOpacity style={styles.component}>
            <Icon size={24} name="content-copy" style={styles.icon} />
            <Text>Copy Text</Text>
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
