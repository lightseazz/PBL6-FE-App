import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Directions } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

export default function Colleague({
  colleagueId,
  username,
  avatar,
  time,
  navigation,
  previewText,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ChatColleague", {
        colleagueId: colleagueId
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
          <Text style={styles.usernameText}>{username}</Text>
          <Text>{previewText}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{time}</Text>
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
  timeText: { fontSize: 12, alignSelf: "flex-end" },
});
