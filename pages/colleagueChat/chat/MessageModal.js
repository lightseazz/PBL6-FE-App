import { Modal } from "react-native";
import { Text, View, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { messageState } from "../../../utils/messageState";
import { userSignedIn } from "../../../globalVar/global";
import { connectionChatColleague } from "../../../globalVar/global";
import * as Clipboard from 'expo-clipboard';

export default function MessageModal(
  { selectedMessageId, modalVisible, setModalVisible, messages, setMessages,
    richTextRef, selectedUserRef, setSendDisabled, setIsEdit }
) {

  async function onDeleteMessage() {
    const response = await connectionChatColleague.invoke("DeleteMessageAsync", selectedMessageId, true).catch(function (err) {
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
    const editMessage = messages.find(message => message.id == selectedMessageId);
    richTextRef.current.initialFocus = true;
    if (editMessage.content && editMessage.content) {
      richTextRef.current.setContentHTML(editMessage.content);
    }
    else {
      richTextRef.current.setContentHTML("");
    }
    richTextRef.text = editMessage.content;
    setSendDisabled(false);
    setModalVisible({
      message: false,
      emoji: false,
    });
    setIsEdit(true);
  }
  async function onPin() {
    setModalVisible({
      message: false,
      emoji: false,
    });
    const pinMessage = messages.find(message => message.id == selectedMessageId);
    const response = await connectionChatColleague.invoke("PinMessage", selectedMessageId, !pinMessage.isPined)
      .catch(function (err) {
        return console.error(err.toString());
      });
    setMessages([...messages]);
  }

  async function onCopyContent() {
    const copyMessage = messages.find(message => message.id == selectedMessageId);
    const copyContent = copyMessage.content;
    console.log(copyContent);
    await Clipboard.setStringAsync(copyContent, {
      inputFormat: Clipboard.StringFormat.HTML = "html",
    });
    setModalVisible({
      message: false,
      emoji: false,
    });
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
          {selectedUserRef.current == userSignedIn.id ? (
            <>
              <TouchableOpacity style={styles.component} onPress={onEditMessage}>
                <Icon size={24} name="pencil" style={styles.icon} />
                <Text>Edit Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.component} onPress={onDeleteMessage}>
                <Icon size={24} name="delete" style={styles.icon} />
                <Text>Delete Message</Text>
              </TouchableOpacity>
            </>
          ) : <></>}
          <TouchableOpacity style={styles.component} onPress={onCopyContent}>
            <Icon size={24} name="content-copy" style={styles.icon} />
            <Text>Copy Text</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.component} onPress={onPin}>
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
