import { FlatList, StatusBar, View, Text, TouchableOpacity, Keyboard, PlatformColor, SafeAreaView, ScrollView, KeyboardAvoidingView } from "react-native";
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
import { messageState } from "../../../utils/messageState";

const tempText = { html: `<p>Lorem amet</p>`, };

export default function ChatColleague({ navigation, route }) {
  const { colleagueId } = route.params;
  const [colleagueName, setColleagueName] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [connection, setConnection] = useState();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalVisible, setModalVisible] = useState({
    message: false,
    emoji: false,
  });
  const [selectedMessageId, setSelectedMessageId] = useState();
  const richTextRef = useRef();
  const flatListRef = useRef();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(function () {
    async function getUserInformation() {
      const userId = await SecureStore.getItemAsync("userId");
      const user = await getUserByIdApi(userId);
      setUserName(user.firstName + " " + user.lastName);
      setUserAvatar(user.picture);

    }
    async function getColleague() {
      const colleague = await getUserByIdApi(colleagueId);
      setColleagueName(colleague.firstName + " " + colleague.lastName)
    }
    async function getInitMessages() {
      let currentTime = (new Date()).toLocaleString();
      const messagesResponse = await getMessageUserApi(currentTime, 7, colleagueId);
      const initMessages = [];
      messagesResponse.map(message => initMessages.push(
        buildMessage(
          message.id,
          message.content,
          message.senderAvatar,
          message.senderName,
          message.sendAt)
      ))
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
      if (message.receiverId != colleagueId) return;
      const MessagesAfterReceived = [...messages];
      MessagesAfterReceived.unshift(
        (
          buildMessage(
            message.id,
            message.content,
            message.senderAvatar,
            message.senderName,
            message.sendAt)
        )
      )
      setMessages(MessagesAfterReceived);
    });

  }, [connection, messages]);

  function sendMessage() {
    if (isEdit == false) {
      let tempId = Date.now();
      let currentTime = new Date()
      let content = richTextRef.text;
      const messagesAfterSending = [...messages];
      messagesAfterSending.unshift(
        buildMessage(
          tempId,
          content,
          userAvatar,
          userName,
          currentTime,
          messageState.isSending,
        )
      )
      setMessages(messagesAfterSending);
      flatListRef.current.scrollToOffset({ offset: 0 });
      richTextRef.current.setContentHTML("");
      setSendDisabled(true);
      sendMessageToServer(content, messagesAfterSending);
    }
    if (isEdit == true) {
      updateMessageToServer();
    }
    setIsEdit(false);
  }
  async function sendMessageToServer(content, messagesAfterSending) {
    const response = await connection.invoke("SendMessageAsync", {
      ReceiverId: colleagueId,
      Content: content,
      IsChannel: false,
    }).catch(function (err) {
      return console.error(err.toString());
    });
    if (typeof response != 'string' || !response instanceof String) {
      return;
    }
    const tempMessages = [...messagesAfterSending]
    tempMessages[0].id = response;
    tempMessages[0].state = "";
    setMessages(tempMessages);
  }
  async function updateMessageToServer() {
    const response = await connection.invoke("UpdateMessageAsync", {
      Id: selectedMessageId,
      Content: richTextRef.text,
      IsChannel: false,
    }).catch(function (err) {
      return console.error(err.toString());
    });
    const editMessage = messages.find(message => message.id == selectedMessageId);
    editMessage.content = { html: `${richTextRef.text}` };
    editMessage.state = messageState.isEdited;
    setMessages([...messages]);
    richTextRef.current.setContentHTML("");
    setSendDisabled(true);
  }
	function cancelEdit(){
    richTextRef.current.setContentHTML("");
		richTextRef.current.initialFocus = false;
		setSendDisabled(true);
    setIsEdit(true);

  }
  function onChangeTextMessage(text) {
    richTextRef.text = text;
    if (!text) {
      setSendDisabled(true);
      return;
    }
    setSendDisabled(false);
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
        <Text style={{ marginLeft: 30, fontSize: 20 }}>{colleagueName}</Text>
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
          flex: 40,
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
              setModalId={setSelectedMessageId}
              id={item.id}
              content={item.content}
              senderAvatar={item.senderAvatar}
              senderName={item.senderName}
              sendAt={item.sendAt}
              state={item.state}
            />
          )}
        />
      </View>
      <MessageModal
        connection={connection}
        messages={messages}
        setMessages={setMessages}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        richTextRef={richTextRef}
        setIsEdit={setIsEdit}
        setSendDisabled={setSendDisabled}
        selectedMessageId={selectedMessageId}
      />
      <EmojiModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedMessageId={selectedMessageId}
      />

      <ScrollView>
        <RichEditor
          editorStyle={{ backgroundColor: 'rgba(52, 52, 52, 0)' }}
          placeholder="Message"
          androidLayerType="software"
          style={{ borderTopWidth: 1, borderColor: 'grey' }}
          ref={richTextRef}
          onChange={onChangeTextMessage}
        />
      </ScrollView>
      <View style={{ flexDirection: 'row' }}>
        <RichToolbar
          editor={richTextRef}
          actions={[actions.setBold, actions.setItalic,
          actions.setUnderline, actions.insertBulletsList, actions.insertOrderedList]}
        />
        <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
          <TouchableOpacity
            style={{
              padding: 10, borderRadius: 20, marginRight: 15,
              alignSelf: 'flex-end', backgroundColor: sendDisabled ? "rgba(52, 52, 52, 0)" : "black"
            }}
            disabled={sendDisabled}
            onPress={sendMessage}>
            <Icon name="send" size={23} color={sendDisabled ? "grey" : "white"} />
          </TouchableOpacity>
          {isEdit ? (
            <TouchableOpacity
              style={{
                padding: 10, borderRadius: 20, marginRight: 15,
                alignSelf: 'flex-end', backgroundColor: "red"
              }}
              onPress={cancelEdit}>
              <Icon name="window-close" size={23} color={"white"} />
            </TouchableOpacity>

          ) : <></>}

        </View>
      </View>
    </View>
  );
}

function buildMessage(id, content, senderAvatar, senderName, sendAt, state = "") {
  return {
    id,
    content: { html: `${content}` },
    senderAvatar,
    senderName,
    sendAt,
    state,
  }
}
