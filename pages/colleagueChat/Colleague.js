import { TouchableOpacity, View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { Directions } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";
import RenderHtml from "react-native-render-html";

export default function Colleague({
  id,
  name,
  avatar,
  lastMessageTime,
  lastMessageSender,
  lastMessage,
  navigation,
}) {
  const { width } = useWindowDimensions();
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
        <View style={styles.leftContainer}>
          <Text style={styles.usernameText}>{name}</Text>
          <RenderHtml contentWidth={width} source={{ html: lastMessage }} />
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{new Date(lastMessageTime).toLocaleString()}</Text>
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
