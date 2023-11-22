import {
  FlatList,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRef, useState } from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import {
  RichToolbar,
  RichEditor,
  actions,
} from "react-native-pell-rich-editor";
import { useContext, useEffect } from "react";
import Message from "./Message";
import MessageModal from "./MessageModal";
import EmojiModal from "./EmojiModal";
import { currentChannelIdContext } from "../../hook/ChannelContext";
import getChannelByIdApi from "../../api/channelApi/getChannelById.api";

const tempText = {
  html: `
  <p>
  Lorem ipsum dolor sit amet, 
  consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  </p>
  <code>this is code block</code>
  <b>bold block</b>
  <i>italic block wef wefw ef wefwe ew<i>`,
};
const avatar =
  "https://images.unsplash.com/photo-1529397938791-2aba4681454f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const tempData = [];

for (let i = 1; i <= 12; i++) {
  tempData.push({
    id: i,
    text: tempText,
    avatar: avatar,
    username: "John David",
    time: "24/10/2023  12:20 AM",
  });
}
export default function ChatChannel({ navigation }) {
  const { currentChannelId } = useContext(currentChannelIdContext);
  const [nameChannel, setNameChannel] = useState("");
  const [modalVisible, setModalVisible] = useState({
    message: false,
    emoji: false,
  });
  const richText = useRef();
  useEffect(
    function () {
      if (currentChannelId != "") {
        try {
          const renderChannelName = async () => {
            const channel = await getChannelByIdApi(currentChannelId);
            setNameChannel(channel.name);
          };
          renderChannelName();
        } catch (error) {}
      }
    },
    [currentChannelId]
  );
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
            <Icon name="options-vertical" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          initialNumToRender={5}
          inverted
          data={tempData}
          renderItem={({ item }) => (
            <Message
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              text={item.text}
              avatar={item.avatar}
              username={item.username}
              time={item.time}
            />
          )}
        />
      </View>
      <MessageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <EmojiModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <View style={{ height: 90 }}>
        <RichToolbar
          editor={richText}
          actions={[actions.setBold, actions.setItalic, actions.code]}
        />
        <RichEditor
          androidLayerType="software"
          ref={richText}
          onChange={(descriptionText) => {
            console.log("descriptionText:", descriptionText);
          }}
        />
      </View>
    </View>
  );
}
