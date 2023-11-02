import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Directions } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

export default function Colleague({ username, avatar, time, navigation }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Chat")}
    >
      <View style={styles.secondContainer}>
        <Avatar.Image
          size={40}
          source={{
            uri: avatar,
          }}
        />
        <Text style={styles.usernameText}>{username}</Text>
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
  usernameText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 15,
  },
  timeText: { fontSize: 12, alignSelf: "flex-end" },
});
