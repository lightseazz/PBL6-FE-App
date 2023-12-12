import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { messageState } from "../../../utils/messageState";

export default function Message({
  state,
  setModalId,
  id,
  setModalVisible,
  content,
  senderId,
  selectedUserRef,
  senderAvatar,
  senderName,
  sendAt,
}) {
  const { width } = useWindowDimensions();
  let time = (new Date(sendAt)).toLocaleString();
  return (
    <>
      {state == "deleted" ? (
        <View style={styles.containerDelete}>
          <Text style={styles.deleteMessage}>Message is Deleted</Text>
        </View>) : (
        <TouchableOpacity
          style={styles.messageContainer}
          delayLongPress={50}
          onLongPress={() => {
            selectedUserRef.current = senderId;
            setModalId(id);
            setModalVisible({
              message: true,
              emoji: false,
            })
          }
          }
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar.Image
              size={40}
              source={{
                uri: senderAvatar,
              }}
            />
            <View>
              {state != "" && state != "deleted" ? <Text style={styles.isSending}>{state}</Text> : <></>}
              <Text style={styles.usernameText}>{senderName}</Text>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          </View>
          <RenderHtml contentWidth={width} source={content} />
          <View style={styles.emojiContainer}>
            <View style={styles.emoji}>
              <Text>😪 1</Text>
            </View>
            <View style={styles.emoji}>
              <Text>😀 1 </Text>
            </View>
            <View style={styles.emoji}>
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => {
                  setModalId(id);
                  setModalVisible({
                    message: false,
                    emoji: true,
                  })
                }
                }
              >
                <Icon name="emoticon-outline" size={21} />
                <Icon name="plus" size={17} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>

  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 13,
    alignSelf: "flex-start",
    borderRadius: 5,
  },
  containerDelete: {
    padding: 13,
    height: 50,
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emoji: {
    alignSelf: "flex-start",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    padding: 3,
    backgroundColor: "#d3e6e8",
  },
  usernameText: { marginLeft: 20, fontWeight: "bold", fontSize: 15 },
  deleteMessage: { fontStyle: "italic" },
  isSending: { marginLeft: 20, fontSize: 15 },
  timeText: { marginLeft: 20, fontSize: 12 },
});
