import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { SvgUri } from "react-native-svg";
import { Avatar, Button, Divider } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import getMessagePinUserApi from "../../../api/chatApi/getMessagePinUser.api";
import getMessageJumpApi from "../../../api/chatApi/getMessageJump.api";
import { connectionChatColleague } from "../../../globalVar/global";
import { compareSendAt } from "../../../utils/common";
import * as Linking from 'expo-linking';

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
            parentId={item.parentId}
            files={item.files}
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
  files,
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
      let response;
      if (!pinMessage.parentId) response = await getMessageJumpApi(id);
      if (pinMessage.parentId) response = await getMessageJumpApi(pinMessage.parentId);
      response = response.sort(compareSendAt);
      setMessages([...response]);
      if (!pinMessage.parentId)
        index = response.findIndex(item => item.id == id);
      if (pinMessage.parentId)
        index = response.findIndex(item => item.id == pinMessage.parentId);
      flatListRef.current.scrollToIndex({ animated: true, index: index })
      navigation.goBack();
    } catch { }
  }
  function RenderFiles() {
    const openLink = (url) => {
      Linking.openURL(url);
    }
    const iconUri = {
      doc: "https://chat.zalo.me/assets/icon-word.d7db8ecee5824ba530a5b74c5dd69110.svg",
      pdf: "https://chat.zalo.me/assets/icon-pdf.53e522c77f7bb0de2eb682fe4a39acc3.svg",
      xls: "https://chat.zalo.me/assets/icon-excel.fe93010062660a8332b5f5c7bb2a43b1.svg",
      zip: "https://chat.zalo.me/assets/icon-zip.e1e9b9936e66e90d774fcb804f39167f.svg",
      default: "https://chat.zalo.me/assets/icon-file-empty.6796cfae2f36f6d44242f7af6104f2bb.svg",
    }
    const fileStyles = StyleSheet.create({
      container: {
        flexDirection: 'row', borderWidth: 0.5,
        borderRadius: 10, padding: 10,
        marginBottom: 10,
        alignItems: 'center',
      }
    })

    if (!files || files.length <= 0) return;
    return (
      <>
        {
          files.map((file, index) => {
            const typeFile = file.name.split(".")[1]
              ? file.name.split(".").pop().slice(0, 3).toUpperCase()
              : "";
            if (typeFile == "IMG" || typeFile == "PNG" || typeFile == "JPE" || typeFile == "JPG") {
              return (
                <TouchableOpacity key={index} onPress={() => openLink(file.url)} style={{ marginBottom: 10 }}>
                  <Image source={{ uri: file.url }} style={{ width: 150, height: 150 }} />
                </TouchableOpacity>
              )
            }
            if (typeFile == "DOC") {
              return (
                <TouchableOpacity
                  key={index}
                  style={fileStyles.container}
                  onPress={() => openLink(file.url)}
                >
                  <SvgUri uri={iconUri.doc} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )
            }
            if (typeFile == "XLS") {
              return (
                <TouchableOpacity key={index}
                  style={fileStyles.container}
                  onPress={() => openLink(file.url)}
                >
                  <SvgUri uri={iconUri.xls} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )

            }
            if (typeFile == "PDF") {
              return (
                <TouchableOpacity key={index}
                  style={fileStyles.container}
                  onPress={() => openLink(file.url)}
                >
                  <SvgUri uri={iconUri.pdf} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )

            }
            if (typeFile == "ZIP" || typeFile == "RAR") {
              return (
                <TouchableOpacity key={index}
                  style={fileStyles.container}
                  onPress={() => openLink(file.url)}
                >
                  <SvgUri uri={iconUri.zip} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )

            }
            if (file.url) {
              return (
                <TouchableOpacity key={index}
                  style={fileStyles.container}
                  onPress={() => openLink(file.url)}
                >
                  <SvgUri uri={iconUri.default} width="35" height="35" />
                  <Text>{file.name}</Text>
                </TouchableOpacity>
              )
            }
          })
        }
      </>
    )
  }
  if (!isPined) return <></>;
  return (
    <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center' }}>
      <TouchableOpacity
        delayLongPress={50}
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
        </View>
        <RenderHtml contentWidth={width} source={{ html: content }} />
        <RenderFiles />
        <View style={styles.emojiContainer}>
          <RenderEmoji />
        </View>
        <Divider bold />
      </TouchableOpacity>
      {isPined ? (
        <TouchableOpacity onPress={onPin}>
          <Icon name="pin-off" size={20} color={"red"}
            style={{ transform: [{ rotateZ: '30deg' }] }}
          ></Icon>
        </TouchableOpacity>
      ) : <></>}
    </View>)
}


const styles = StyleSheet.create({
  messageContainer: {
    padding: 13,
    margin: 10,
    alignSelf: "flex-start",
    borderRadius: 5,
    borderRadius: 10,
    width: "95%"
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

