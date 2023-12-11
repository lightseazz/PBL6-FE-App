import { FlatList, StatusBar, View, Text, TouchableOpacity, Keyboard, PlatformColor } from "react-native";
import { useRef, useState } from "react";
import { RichToolbar, RichEditor, actions } from "react-native-pell-rich-editor";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store"
import * as signalR from "@microsoft/signalr"
import Message from "./Message";
import MessageModal from "./MessageModal";
import EmojiModal from "./EmojiModal";
import { ActivityIndicator, Button } from "react-native-paper";
import getMessageUserApi from "../../../api/chatApi/getMessageUser.api";
import getUserByIdApi from "../../../api/userApi/getUserById.api";

const tempText = { html: `<p>Lorem amet</p>`, };

export default function ChatThreadUser({ navigation, route }) {
  const { parentMessageId, colleagueId } = route.params;
  const [messages, setMessages] = useState([]);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [connection, setConnection] = useState();
  const [messageSend, setMessageSend] = useState("");
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    message: false,
    emoji: false,
  });
  const [modalId, setModalId] = useState();
  const richText = useRef();
  const flatListRef = useRef();
  useEffect(function () {
    async function getUserInformation() {
      const userId = await SecureStore.getItemAsync("userId");
      const user = await getUserByIdApi(userId);
      setUserName(user.firstName + " " + user.lastName);
      setUserAvatar(user.picture);

    }
    async function getInitMessages() {
      let currentTime = (new Date()).toLocaleString();
      const messagesResponse = await getMessageUserApi(currentTime, 5, colleagueId);
      const initMessages = [];
      messagesResponse.map(message => initMessages.push({
        id: message.id,
        content: { html: `<p>${message.content}</p>` },
        senderAvatar: message.senderAvatar,
        senderName: message.senderName,
        sendAt: message.sendAt,
      }))
      setMessages(initMessages);
    }
    async function connectHub() {
      let baseUrl = "https://api.firar.live";
      const userToken = await SecureStore.getItemAsync("userToken");
      let connection = new signalR.HubConnectionBuilder()
        .withUrl(`${baseUrl}/chatHub?access_token=${userToken}`)
        // .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect()
        .build()
      setConnection(connection);

      connection.on("Error", function (message) {
        console.log("signalR Connection Error: ", message);
      });
      connection.start().then(function () {
        setSendDisabled(false);
      })
        .catch(function (err) {
          return console.error(err.toString());
        });
    }
    getUserInformation();
    connectHub();
    getColleague();
    getInitMessages();
  }, [])

  // receive message
  useEffect(function () {
    if (!connection) return;
    connection.on("receive_message", function (message) {
      if (message.isChannel) return;
      const MessagesAfterReceived = [...messages];
      MessagesAfterReceived.unshift({
        id: message.id,
        content: { html: `${message.content}` },
        senderAvatar: message.senderAvatar,
        senderName: message.senderName,
        sendAt: message.sendAt,
      })
      setMessages(MessagesAfterReceived);
    });

  }, [connection, messages]);

  async function sendMessage() {
    const response = await connection.invoke("SendMessageAsync", {
      ReceiverId: colleagueId,
      Content: messageSend,
      IsChannel: false,
    }).catch(function (err) {
      return console.error(err.toString());
    });
    // check response valid

    //
    richText.current.blurContentEditor();
    richText.current.setContentHTML("");
    let currentTime = new Date();
    const MessagesAfterReceived = [...messages];
    MessagesAfterReceived.unshift({
      id: response,
      content: { html: `${messageSend}` },
      senderAvatar: userAvatar,
      senderName: userName,
      sendAt: currentTime,
    })
    setMessages(MessagesAfterReceived);
    flatListRef.current.scrollToOffset({ offset: 0 });
  }
  async function handleOnEndReached() {
    setLoadingMore(true);
    if (!messages || messages.length <= 0) {
      setLoadingMore(false);
      return;
    }
    const oldestMessage = messages[messages.length - 1];
    let oldestTime = new Date(oldestMessage.sendAt);
    oldestTime = oldestTime.toISOString();
    const response = await getMessageUserApi(oldestTime, 5, colleagueId);

    const loadMoreMessage = [...messages];
    response.map(message => loadMoreMessage.push({
      id: message.id,
      content: { html: `${message.content}` },
      senderAvatar: message.senderAvatar,
      senderName: message.senderName,
      sendAt: message.sendAt,
    }))
    setMessages(loadMoreMessage);
    // reach to oldest message in database
    if (response.length == 0) {
      setLoadingMore(false);
      return;
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 60,
          marginTop: StatusBar.currentHeight,
          borderBottomWidth: 1,
          alignItems: "center",
          paddingLeft: 10,
          paddingRight: 12,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={28} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 20 }}>Thread</Text>
        <View
          style={{
            flexDirection: "row-reverse",
            flex: 1,
          }}
        >
        </View>
      </View>
      <View
        style={{
          flex: 5,
        }}
      >
        <FlatList
          ref={flatListRef}
          ListFooterComponent={() => loadingMore && <ActivityIndicator color="black" size={30} />}
          onEndReached={handleOnEndReached}
          onEndReachedThreshold={0.5}
          initialNumToRender={5}
          inverted
          data={messages}
          renderItem={({ item }) => (
            <Message
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setModalId={setModalId}
              id={item.id}
              content={item.content}
              senderAvatar={item.senderAvatar}
              senderName={item.senderName}
              sendAt={item.sendAt}
            />
          )}
        />
      </View>
      <MessageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedMessageId={modalId}
      />
      <EmojiModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        modalId={modalId}
      />
      <View style={{ height: 90, flex: 1, width: '100%', flexDirection: 'column-reverse' }}>
        <View style={{ width: '100%', flexDirection: 'row', padding: 15, alignItems: 'center' }}>
          <View style={{ width: '80%' }}>
            <RichEditor
              style={{ borderWidth: 1, borderRadius: 10, padding: 3, backgroundColor: "white" }}
              androidLayerType="software"
              ref={richText}
              onChange={(text) => setMessageSend(text)}
            />
          </View>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{ backgroundColor: sendDisabled ? "grey" : "black", padding: 10, borderRadius: 20 }}
              disabled={sendDisabled}
              onPress={sendMessage}>
              <Icon name="send" size={23} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <RichToolbar
          editor={richText}
          actions={[actions.setBold, actions.setItalic,
          actions.code, actions.insertOrderedList, actions.insertLink]}
        />
      </View>
    </View>
  );
}

