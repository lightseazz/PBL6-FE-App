import { StatusBar, View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useContext, useRef, useState } from "react";
import { RichToolbar, RichEditor, actions } from "react-native-pell-rich-editor";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useEffect } from "react";
import Message from "./Message";
import MessageModal from "./MessageModal";
import EmojiModal from "./EmojiModal";
import { ActivityIndicator, Divider } from "react-native-paper";
import getMessageChannelApi from "../../../api/chatApi/getMessageChannel.api";
import getUserByIdApi from "../../../api/userApi/getUserById.api";
import { messageState } from "../../../utils/messageState";
import { FlashList } from "@shopify/flash-list";
import { userSignedIn } from "../../../globalVar/global";
import { useIsFocused } from "@react-navigation/native";
import { currentChannelIdContext } from "../../../hook/ChannelContext";
import { setConnectionChatChannel } from "../../../globalVar/global";
import { connectionChatChannel } from "../../../globalVar/global";
import getChannelByIdApi from "../../../api/channelApi/getChannelById.api";
import * as DocumentPicker from 'expo-document-picker';
import uploadFilesApi from "../../../api/chatApi/uploadFiles.api";

export default function ChatChannel({ navigation, route }) {
  const isFocused = useIsFocused();
  const { currentChannelId } = useContext(currentChannelIdContext);
  const [nameChannel, setNameChannel] = useState("");
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
    async function renderChannelName() {
      const channel = await getChannelByIdApi(currentChannelId);
      setNameChannel(channel.name);
    };
    async function getInitMessages() {
      let currentTime = (new Date()).toLocaleString();
      const messagesResponse = await getMessageChannelApi(currentTime, 7, currentChannelId);
      const initMessages = [];
      messagesResponse.map(message => {
        message.state = message.isEdited ? messageState.isEdited : "",
          initMessages.push(message);
      }
      )
      setMessages(initMessages);
    }

    if (currentChannelId && isFocused) {
      renderChannelName();
      getInitMessages();
    }
  }, [currentChannelId])

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
    connectionChatChannel.off("receive_message");
    connectionChatChannel.on("receive_message", function (message) {
      if (!message.isChannel) return;
      if (message.receiverId != currentChannelId) return;
      if (message.parentId) {
        const updateChildCountMessage = messages.find(msg => msg.id == message.parentId)
        updateChildCountMessage.childCount += 1;
        setMessages([...messages]);
        return;
      }
      const MessagesAfterReceived = [...messages];
      message.state = message.isEdited ? messageState.isEdited : "",
        MessagesAfterReceived.unshift(message);
      setMessages(MessagesAfterReceived);
    });
  }
  function receiveUpdate() {
    connectionChatChannel.off("update_message");
    connectionChatChannel.on("update_message", function (message) {
      if (!message.isChannel) return;
      if (message.receiverId != currentChannelId) return;
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
    connectionChatChannel.off("delete_message");
    connectionChatChannel.on("delete_message", function (message) {
      if (!message.isChannel) return;
      if (message.parentId) {
        const updateChildCountMessage = messages.find(msg => msg.id == message.parentId)
        updateChildCountMessage.childCount -= 1;
        setMessages([...messages]);
        return;
      }
      if (message.receiverId != currentChannelId) return;
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
    const response = await connectionChatChannel.invoke("SendMessageAsync", {
      ReceiverId: currentChannelId,
      Content: content,
      IsChannel: true,
      Files: toUploadFiles.length ? [...toUploadFiles.map(file => file.id)] : [],
    }).catch(function (err) {
      return console.error(err.toString());
    });
    if (!response || response.length <= 0) {
      return;
    }
    const tempMessages = [...messagesAfterSending]
    tempMessages[0].id = response.id;
    tempMessages[0].state = "";
    tempMessages[0].files = response.files;
    setMessages(tempMessages);
  }
  async function updateMessageToServer() {
    const response = await connectionChatChannel.invoke("UpdateMessageAsync", {
      Id: selectedMessageId,
      Content: richTextRef.text,
      IsChannel: true,
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
    const response = await getMessageChannelApi(oldestTime, 5, currentChannelId);

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
    let response = await getMessageChannelApi(newestTime, 5, currentChannelId, false);
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
          onPress={() => navigation.getParent("LeftDrawer").openDrawer()}
        >
          <Icon name="menu" size={28} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 30, fontSize: 20 }}># {nameChannel}</Text>
        <View
          style={{
            flexDirection: "row-reverse",
            flex: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.getParent("RightDrawer").openDrawer()}
          >
            <Icon name="cog" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("PinChannel", {
              flatListRef: flatListRef,
              currentChannelId: currentChannelId,
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
              currentChannelId={currentChannelId}
              resetParentMessageRef={resetParentMessageRef}
              navigation={navigation}
              selectedUserRef={selectedUserRef}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              setModalId={setSelectedMessageId}
              id={item.id}
              childCount={item.childCount}
              senderId={item.senderId}
              reactionCount={item.reactionCount}
              content={item.content}
              senderAvatar={item.senderAvatar}
              senderName={item.senderName}
              sendAt={item.sendAt}
              isPined={item.isPined}
              state={item.state}
              files={item.files}
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
          style={{ borderTopWidth: 0.5, borderColor: 'grey' }}
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
        ): <></>}

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

function buildMessage({ id, childCount, isPined, isEdited, reactionCount, senderId,
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
