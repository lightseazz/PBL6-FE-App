import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Avatar, Button, Divider } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import getMessagePinUserApi from "../../../api/chatApi/getMessagePinUser.api";
import getMessageJumpApi from "../../../api/chatApi/getMessageJump.api";
import { connectionChatColleague } from "../../../globalVar/global";
import { compareSendAt } from "../../../utils/common";

export default function PinColleague({ navigation, route }) {
  const { colleagueId, setMessages, messages, flatListRef } = route.params;
  const [pinMessages, setPinMessages] = useState([]);
  useEffect(function () {
    try {
      async function initPinMessages() {
        const response = await getMessagePinUserApi(colleagueId, 0, 20);
        setPinMessages([...response]);
      }
      initPinMessages();
    } catch {

    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={pinMessages}
        estimatedItemSize={200}
        renderItem={({ item }) => (
          <PinMessage
            flatListRef={flatListRef}
            navigation={navigation}
            pinMessages={pinMessages}
            setPinMessages={setPinMessages}
            messages={messages}
            setMessages={setMessages}
            id={item.id}
            senderName={item.senderName}
            senderAvatar={item.senderAvatar}
            sendAt={item.sendAt}
            content={item.content}
            isPined={item.isPined}
            childCount={item.childCount}
            reactionCount={item.reactionCount}
          />
        )}
      />

    </View>
  )
}


function PinMessage({
  flatListRef,
  navigation,
  pinMessages,
  setPinMessages,
  messages,
  setMessages,
  id,
  senderName,
  senderAvatar,
  sendAt,
  content,
  childCount,
  reactionCount,
  isPined,
}) {
  const { width } = useWindowDimensions();
  function RenderEmoji() {
    if (!reactionCount) return <></>;
    const emojis = Object.entries(reactionCount);
    return (
      <>
        {emojis.map((emoji, index) => {
          return (
            <View key={index} style={styles.emoji}>
              <Text>{emoji[0]} {emoji[1]}  </Text>
            </View>
          )
        })}
      </>
    )
  }
  async function onPin() {
    const response = await connectionChatColleague.invoke("PinMessage", id, false)
      .catch(function (err) {
        return console.error(err.toString());
      });
    // render chat channel
    const pinMessage = messages.find(message => message.id == id);
    if (pinMessage)
      setMessages([...messages]);
    // render pin channel
    const pinMsg = pinMessages.find(message => message.id == id);
    pinMsg.isPined = !pinMsg.isPined;
    setPinMessages([...pinMessages]);
  }
  async function jumpMessage() {
    try {
      const pinMessage = pinMessages.find(message => message.id == id);
      if (!pinMessage.parentId) {
        let response = await getMessageJumpApi(id);
        response = response.sort(compareSendAt);
        setMessages([...response]);
        const index = response.findIndex(item => item.id == id)
        flatListRef.current.scrollToIndex({ animated: true, index: index })
        navigation.goBack();
      }
    } catch { }
  }
  return (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={jumpMessage}

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
          <Text style={styles.usernameText}>{senderName}</Text>
          <Text style={styles.timeText}>{new Date(sendAt).toLocaleString()}</Text>
        </View>
        {isPined ? (
          <TouchableOpacity style={styles.pin} onPress={onPin}>
            <Icon name="pin" size={15} color={"red"} >unpin</Icon>
          </TouchableOpacity>
        ) : <></>}
      </View>
      <RenderHtml contentWidth={width} source={{ html: content }} />
      <View style={styles.emojiContainer}>
        <RenderEmoji />
      </View>
      <Divider bold />
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  messageContainer: {
    padding: 13,
    margin: 10,
    alignSelf: "flex-start",
    borderRadius: 5,
    borderRadius: 10,
    width: "100%"
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
    width: 200,
    marginTop: 10,
  },
  usernameText: { marginLeft: 20, fontWeight: "bold", fontSize: 15 },
  deleteMessage: { fontStyle: "italic" },
  timeText: { marginLeft: 20, fontSize: 12 },
  childCount: { color: '#3B7DBB' },
  pin: {
    alignSelf: 'flex-start',
    borderRadius: 15,
    padding: 5,
    borderWidth: 1,
    backgroundColor: "white",
    marginLeft: 10,
  }
});

