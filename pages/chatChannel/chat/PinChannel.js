import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Avatar } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import getMessagePinChannelApi from "../../../api/chatApi/getMessagePinChannel.api";

export default function PinChannel({ navigation, route }) {
  const { currentChannelId } = route.params;
  const [pinMessages, setPinMessages] = useState([]);
  useEffect(function () {
    try {
      async function initPinMessages() {
        const response = await getMessagePinChannelApi(currentChannelId, 0, 10);
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
  return (
    <TouchableOpacity
      style={styles.messageContainer}
      delayLongPress={50}
    // onPress={}

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
          <Icon name="pin" size={20} color={"red"} style={{ marginLeft: 10 }}></Icon>
        ): <></>}
      </View>
      <RenderHtml contentWidth={width} source={{ html: content }} />
      <View style={styles.emojiContainer}>
        <RenderEmoji />
      </View>
      <TouchableOpacity style={styles.replyContainer} >
        <Text style={styles.childCount}>{childCount} replies</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
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
    width: 200,
    marginTop: 10,
  },
  usernameText: { marginLeft: 20, fontWeight: "bold", fontSize: 15 },
  deleteMessage: { fontStyle: "italic" },
  timeText: { marginLeft: 20, fontSize: 12 },
  childCount: { color: '#3B7DBB' }
});

