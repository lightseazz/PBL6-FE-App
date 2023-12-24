import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Directions } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

const icon = "https://cdn-icons-png.flaticon.com/512/3119/3119338.png"

export default function Item({
  navigation,
  id,
  title,
  content,
  createAt,
  isRead,
  type,
  data,

}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ItemDetail", {
        id,
        title,
        content,
        createAt,
        isRead,
        type,
        data,
      })}
    >
      <View style={styles.secondContainer}>
        <Avatar.Image
          style={{ borderRadius: 10, backgroundColor: 'white' }}
          size={30}
          source={{
            uri: icon,
          }}
        />
        <View style={styles.leftContainer}>
          <Text style={styles.previewTitle}>{title}</Text>
          <Text>{content}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{createAt}</Text>
        </View>
      </View>
    </TouchableOpacity >
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
  typeText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  previewTitle: {
    color: "#1a69a6",
  },
  timeText: { fontSize: 12, alignSelf: "flex-end" },
});
