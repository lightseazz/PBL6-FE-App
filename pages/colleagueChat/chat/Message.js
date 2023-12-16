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
import { useState } from "react";

export default function Message({
  connection,
  colleagueId,
  navigation,
  state,
  childCount,
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
  function onPressReply() {
    navigation.navigate("ChatThreadUser", {
      connection: connection,
      colleagueId: colleagueId,
      parentMessageId: id,
			parentContent: content,
			parentSendAt: sendAt,
			parentSenderId: senderId,
			parentSenderName: senderName,
			parentState: state,
			parentAvatar: senderAvatar,

    })
  }
  return (
    <>
      {state == "deleted" ? (
        <View style={styles.containerDelete}>
          <Text style={styles.deleteMessage}>Message is Deleted</Text>
        </View>) : (
        <TouchableOpacity
          style={styles.messageContainer}
          delayLongPress={50}
          onPress={onPressReply}
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
          <TouchableOpacity style={styles.replyContainer} onPress={onPressReply}>
            <Text style={styles.childCount}>{childCount} replies</Text>
          </TouchableOpacity>
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
  replyContainer: {
    backgroundColor: '#E3E5E7',
    borderRadius: 10,
    padding: 3,
    paddingLeft: 10,
  },
  usernameText: { marginLeft: 20, fontWeight: "bold", fontSize: 15 },
  deleteMessage: { fontStyle: "italic" },
  isSending: { marginLeft: 20, fontSize: 15 },
  timeText: { marginLeft: 20, fontSize: 12 },
  childCount: { color: '#3B7DBB' }
});
