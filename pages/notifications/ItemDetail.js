import { View, StyleSheet, Text, StatusBar } from "react-native";
import { Avatar, Divider } from "react-native-paper";

const icon =
  "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const tempData = {
  id: 1,
  icon: icon,
  type: "Workspace 1",
  time: "24/10 12:00 PM",
  title: "You have meeting at Workspace 1",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia nobis reprehenderit sequi illo minima quibusdam cum! Veniam officiis aperiam possimus exercitationem recusandae, dignissimos voluptatem soluta repellat rerum. Sed, ab qui?",
};

export default function ItemDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tempData.title}</Text>
      <View style={styles.secondContainer}>
        <Avatar.Image
          style={{ borderRadius: 10 }}
          size={40}
          source={{
            uri: tempData.icon,
          }}
        />
        <View style={styles.leftContainer}>
          <Text style={styles.typeText}>{tempData.type}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{tempData.time}</Text>
        </View>
      </View>
      <Divider bold={true} style={styles.divider} />
      <Text style={styles.text}>{tempData.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: "5%",
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
  title: {
    marginBottom: 20,
    color: "#1a69a6",
    fontSize: 18,
  },
  timeText: { fontSize: 12, alignSelf: "flex-end" },
  divider: {
    marginTop: 20,
    borderWidth: 0.8,
  },
  text: {
    marginTop: 20,
  },
});
