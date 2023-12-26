import { StatusBar, View, Text, TouchableOpacity, ScrollView, PlatformColor } from "react-native";
import { useCallback, useRef, useState } from "react";
import { RichToolbar, RichEditor, actions } from "react-native-pell-rich-editor";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import * as signalR from "@microsoft/signalr";
import Message from "./Message";
import MessageModal from "./MessageModal";
import EmojiModal from "./EmojiModal";
import { ActivityIndicator, Divider } from "react-native-paper";
import getMessageUserApi from "../../../api/chatApi/getMessageUser.api";
import getUserByIdApi from "../../../api/userApi/getUserById.api";
import { messageState } from "../../../utils/messageState";
import { FlashList } from "@shopify/flash-list";
import { userSignedIn } from "../../../globalVar/global";
import { connectionChatColleague } from "../../../globalVar/global";
import { useIsFocused } from "@react-navigation/native";
import * as DocumentPicker from 'expo-document-picker';
import uploadFilesApi from "../../../api/chatApi/uploadFiles.api";

export default function ChatColleague({ navigation, route }) {

  const isFocused = useIsFocused();
  const { colleagueId } = route.params;

  const [colleagueName, setColleagueName] = useState("");
  const [messages, setMessages] = useState([]);
  const [sendDisabled, setSendDisabled] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [modalVisible, setModalVisible] = useState({ message: false, emoji: false, });
  const [selectedMessageId, setSelectedMessageId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const richTextRef = useRef();
  const flatListRef = useRef();
  const selectedUserRef = useRef("");
  const resetParentMessageRef = useRef({
    isChanging: false, whatChange: "", id: 0,
    content: "", state: "", childCount: 0, reactionCount: null,
  });
  useEffect(function () {
    async function getColleague() {
      const colleague = await getUserByIdApi(colleagueId);
      setColleagueName(colleague.firstName + " " + colleague.lastName)
    }
    async function getInitMessages() {
      let currentTime = (new Date()).toLocaleString();
      const messagesResponse = await getMessageUserApi(currentTime, 7, colleagueId);
      const initMessages = [];
      messagesResponse.map(message => {
        message.state = message.isEdited ? messageState.isEdited : "";
        initMessages.push(message);
      })
      setMessages(initMessages);
    }
    getColleague();
    if (isFocused) getInitMessages();
  }, [])

  useEffect(function () {
    if (resetParentMessageRef.current.isChanging == true) {
      resetParentMessageRef.current.isChanging == false;
      const resetParentMessage = messages.find(msg => msg.id == resetParentMessageRef.current.id);
      resetParentMessage.content = resetParentMessageRef.current.content;
      resetParentMessage.state = resetParentMessageRef.current.state;
      resetParentMessage.childCount = resetParentMessageRef.current.childCount;
      resetParentMessage.reactionCount = resetParentMessageRef.current.reactionCount;
      setMessages([...messages]);
    }
  }, [resetParentMessageRef.current.isChanging])

  if (isFocused == true) {
    receiveMessage();
    receiveUpdate();
    receiveDelete();
  }

  function receiveMessage() {
    connectionChatColleague.off("receive_message");
    connectionChatColleague.on("receive_message", function (message) {
      if (message.isChannel) return;
      if (message.senderId != colleagueId) return;
      if (message.parentId) {
        const updateChildCountMessage = messages.find(msg => msg.id == message.parentId)
        updateChildCountMessage.childCount += 1;
        setMessages([...messages]);
        return;
      }
      const MessagesAfterReceived = [...messages];
      message.state = message.isEdited ? messageState.isEdited : "";
      MessagesAfterReceived.unshift(message);
      setMessages(MessagesAfterReceived);
    });
  }
  function receiveUpdate() {
    connectionChatColleague.off("update_message");
    connectionChatColleague.on("update_message", function (message) {
      if (message.isChannel) return;
      if (message.senderId != colleagueId && message.receiverId != colleagueId) return;
      const updateMessage = messages.find(msg => msg.id == message.id);
      updateMessage.content = message.content;
      updateMessage.reactionCount = message.reactionCount;
      updateMessage.childCount = message.childCount;
      updateMessage.isPined = message.isPined;
      updateMessage.files = message.files;
      updateMessage.state = message.isEdited ? messageState.isEdited : "";
      setMessages([...messages]);
    })
  }
  function receiveDelete() {
    connectionChatColleague.off("delete_message");
    connectionChatColleague.on("delete_message", function (message) {
      if (message.isChannel) return;
      if (message.parentId) {
        const updateChildCountMessage = messages.find(msg => msg.id == message.parentId)
        updateChildCountMessage.childCount -= 1;
        setMessages([...messages]);
        return;
      }
      if (message.senderId != colleagueId && message.receiverId != colleagueId) return;
      const deleteMessage = messages.find(msg => msg.id == message.id);
      deleteMessage.state = messageState.isDeleted;
      setMessages([...messages]);
    })
  }
  async function sendMessage() {
    if (isEdit == false) {
      let tempId = Date.now();
      let currentTime = new Date()
      let content = richTextRef.text;
      //  upload files
      let toUploadFiles = null;
      if (uploadFiles.length >= 0)
        toUploadFiles = await uploadFilesApi(uploadFiles);
      // 
      const messagesAfterSending = [...messages];
      messagesAfterSending.unshift(
        buildMessage({
          id: tempId,
          senderId: userSignedIn.id,
          childCount: 0,
          content,
          senderAvatar: userSignedIn.picture,
          senderName: userSignedIn.firstName + " " + userSignedIn.lastName,
          sendAt: currentTime,
          state: messageState.isSending,
        })
      )
      setMessages(messagesAfterSending);
      flatListRef.current.scrollToOffset({ offset: 0 });
      richTextRef.current.setContentHTML("");
      setUploadFiles([]);
      setSendDisabled(true);
      sendMessageToServer(content, messagesAfterSending, toUploadFiles);
    }
    if (isEdit == true) {
      updateMessageToServer();
    }
    setIsEdit(false);
  }
  async function sendMessageToServer(content, messagesAfterSending, toUploadFiles) {
    const response = await connectionChatColleague.invoke("SendMessageAsync", {
      ReceiverId: colleagueId,
      Content: content,
      IsChannel: false,
      Files: toUploadFiles.length ? [...toUploadFiles.map(file => file.id)] : [],
    }).catch(function (err) {
      return console.error(err.toString());
    });
    if (response.length <= 0) {
      return;
    }
    const tempMessages = [...messagesAfterSending]
    tempMessages[0].id = response.id;
    tempMessages[0].state = "";
    tempMessages[0].files = response.files;
    setMessages(tempMessages);
  }
  async function updateMessageToServer() {
    const response = await connectionChatColleague.invoke("UpdateMessageAsync", {
      Id: selectedMessageId,
      Content: richTextRef.text,
      IsChannel: false,
    }).catch(function (err) {
      return console.error(err.toString());
    });
    richTextRef.current.setContentHTML("");
    setSendDisabled(true);
  }
  function cancelEdit() {
    richTextRef.current.setContentHTML("");
    richTextRef.current.initialFocus = false;
    setSendDisabled(true);
    setIsEdit(false);
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
    response.map(message => {
      message.state = message.isEdited ? messageState.isEdited : "";
      loadMoreMessage.push(message);
    })
    setMessages(loadMoreMessage);
    // reach to oldest message in database
    if (response.length == 0) {
      setLoadingMore(false);
      return;
    }
  }
  async function handleBottomReach() {
    const newestMessage = messages[0];
    let newestTime = new Date(newestMessage.sendAt).toISOString();
    let response = await getMessageUserApi(newestTime, 5, colleagueId, false);
    response.pop();
    if (!response.length || response.length <= 0) return;
    let loadMoreMessage = [...messages];
    response.map(message => {
      message.state = message.isEdited ? messageState.isEdited : "";
    })
    loadMoreMessage = response.concat(loadMoreMessage);
    setMessages(loadMoreMessage);

  }

  // upload file
  const [uploadFiles, setUploadFiles] = useState([]);
  function RenderUploadImages() {
    if (!uploadFiles || uploadFiles.length <= 0) return <></>;
    return (
      <>
        {uploadFiles.map((file, index) => {
          return (
            <View key={index} style={{
              alignSelf: 'flex-start', position: 'relative', flexWrap: 'wrap',
              flexDirection: 'row', margin: 10, borderWidth: 0.5, padding: 3, borderRadius: 15
            }}>
              <Icon name="file" size={23}></Icon>
              <Text>{file.name}</Text>
              <TouchableOpacity onPress={() => cancelUploadFile(file)}>
                <Icon name="close" size={20}></Icon>
              </TouchableOpacity>
            </View>
          )
        })}
      </>
    )
  }
  function cancelUploadFile(file) {
    let resetUploadfiles = uploadFiles;
    let cancelFileIndex = resetUploadfiles.findIndex(
      upLoadFile => file.uri == upLoadFile.uri && file.size == upLoadFile.size
    );
    resetUploadfiles.splice(cancelFileIndex, 1);
    setUploadFiles([...resetUploadfiles]);
    if (uploadFiles <= 0) setSendDisabled(true);

  }
  async function onUploadFile() {
    let result = await DocumentPicker.getDocumentAsync({
      multiple: true,
    });

    if (!result.canceled) {
      let newUploadFiles = uploadFiles;
      result.assets.map(asset => {
        newUploadFiles.push(asset);
      });
      setUploadFiles([...newUploadFiles]);
      if (uploadFiles.length > 0) setSendDisabled(false);
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
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("PinColleague", {
              flatListRef: flatListRef,
              colleagueId: colleagueId,
              messages: messages,
              setMessages: setMessages,
            })}
          >
            <Icon name="pin" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 40,
        }}
      >
        <FlashList
          ref={flatListRef}
          ListFooterComponent={() => loadingMore && <ActivityIndicator color="black" size={30} />}
          onEndReached={handleOnEndReached}
          refreshing={false}
          onRefresh={handleBottomReach}
          onEndReachedThreshold={0.1}
          estimatedItemSize={200}
          inverted
          data={messages}
          renderItem={({ item }) => (
            <Message
              resetParentMessageRef={resetParentMessageRef}
              colleagueId={colleagueId}
              navigation={navigation}
              selectedUserRef={selectedUserRef}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setModalId={setSelectedMessageId}
              id={item.id}
              childCount={item.childCount}
              isPined={item.isPined}
              senderId={item.senderId}
              reactionCount={item.reactionCount}
              content={item.content}
              senderAvatar={item.senderAvatar}
              senderName={item.senderName}
              sendAt={item.sendAt}
              files={item.files}
              state={item.state}
            />
          )}
        />
      </View>
      <MessageModal
        messages={messages}
        setMessages={setMessages}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        richTextRef={richTextRef}
        selectedUserRef={selectedUserRef}
        setIsEdit={setIsEdit}
        setSendDisabled={setSendDisabled}
        selectedMessageId={selectedMessageId}
      />
      <EmojiModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedMessageId={selectedMessageId}
        messages={messages}
        setMessages={setMessages}
      />

      {!uploadFiles || uploadFiles.length <= 0 ? <></> : (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ marginLeft: 10, color: 'grey', fontStyle: 'italic' }}>Upload files</Text>
            <Divider style={{ flex: 1 }} bold />
          </View>
          <ScrollView style={{ maxHeight: 150 }}>
            <RenderUploadImages />
          </ScrollView>
        </>
      )}

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

        {!isEdit ? (
          <TouchableOpacity style={{ alignSelf: 'flex-start', padding: 10 }} onPress={onUploadFile}>
            <Icon name="link" size={23}></Icon>
          </TouchableOpacity>
        ) : <></>}

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

function buildMessage({ id, childCount, isEdited, isPined, reactionCount, senderId,
  content, senderAvatar, senderName, sendAt, state = "" }) {
  return {
    id,
    isEdited,
    isPined,
    childCount,
    reactionCount,
    senderId,
    content,
    senderAvatar,
    senderName,
    sendAt,
    state,
  }
}
