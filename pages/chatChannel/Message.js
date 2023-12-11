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

export default function Message({
  isSending,
  setModalVisible,
  text,
  avatar,
  username,
  time,
}) {
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      style={styles.messageContainer}
      delayLongPress={200}
      onLongPress={() =>
        setModalVisible({
          message: true,
          emoji: false,
        })
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
            uri: avatar,
          }}
        />
        <View>
					<Text>...Sending</Text>
          <Text style={styles.usernameText}>{username}</Text>
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </View>
      <RenderHtml contentWidth={width} source={text} />
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
            onPress={() =>
              setModalVisible({
                message: false,
                emoji: true,
              })
            }
          >
            <Icon name="emoticon-outline" size={21} />
            <Icon name="plus" size={17} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 13,
    alignSelf: "flex-start",
    borderRadius: 5,
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
  usernameText: { marginLeft: 20, fontWeight: "bold", fontSize: 15 },
  timeText: { marginLeft: 20, fontSize: 12 },
});
