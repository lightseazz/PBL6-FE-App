import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Directions } from "react-native-gesture-handler";
import { Avatar } from "react-native-paper";

export default function Item({
  icon,
  type,
  time,
  previewText,
  previewTitle,
  navigation,
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("ItemDetail")}
    >
      <View style={styles.secondContainer}>
        <Avatar.Image
          style={{ borderRadius: 10 }}
          size={40}
          source={{
            uri: icon,
          }}
        />
        <View style={styles.leftContainer}>
          <Text style={styles.typeText}>{type}</Text>
          <Text style={styles.previewTitle}>{previewTitle}</Text>
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
  typeText: {
    fontWeight: "bold",
    fontSize: 17,
  },
  previewTitle: {
    color: "#1a69a6",
  },
  timeText: { fontSize: 12, alignSelf: "flex-end" },
});
