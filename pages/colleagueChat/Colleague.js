import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Directions } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Colleague({
  id,
  name,
  avatar,
  lastMessageTime,
  lastMessageSender,
  lastMessage,
  isOnline,
  navigation,
}) {
  const { width } = useWindowDimensions();
  const HTMLMessage = useRef();
  const [truncateLastMessage, setTruncateLastMessage] = useState("");
  useEffect(function () {
    if (typeof lastMessage != "string") return;
    let noHtmlContent = lastMessage.replace(/<[^>]+>/g, '');
    if (noHtmlContent.length <= 10) {
      setTruncateLastMessage(noHtmlContent);
      return;
    };
    setTruncateLastMessage(noHtmlContent.slice(0, 10) + "...");
  }, [])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ChatColleague", {
        colleagueId: id
      })}
    >
      <View style={styles.secondContainer}>
        <Avatar.Image
          size={40}
          source={{
            uri: avatar,
          }}
        />
        <Icon
          name="circle"
          style={{ alignSelf: 'flex-end', marginLeft: -2 }}
          size={13}
          color={isOnline ? "green" : "red"}
        ></Icon>
        <View ref={HTMLMessage} style={styles.leftContainer}>
          <Text style={styles.usernameText}>{name}</Text>
          <View style={{ maxHeight: 50, maxWidth: 100 }}>
            <Text>{truncateLastMessage}</Text>
          </View>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{lastMessageTime ? new Date(lastMessageTime).toLocaleString() : ""}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 13,
  },
  secondContainer: {
    flexDirection: "row",
    width: "100%",
  },
  timeContainer: {
    flex: 1,
    justifyContent: "center",
  },
  leftContainer: {
    marginLeft: 10,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 15,
  },
  timeText: {
    fontSize: 12,
    alignSelf: "flex-end",
    fontStyle: 'italic',
  },
});
