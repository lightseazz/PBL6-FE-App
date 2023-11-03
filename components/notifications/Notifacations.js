import { View, FlatList, StyleSheet } from "react-native";
import Item from "./Item";

const icon =
  "https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const tempData = [];
for (let i = 1; i <= 5; i++) {
  tempData.push({
    id: i,
    icon: icon,
    type: i % 2 == 0 ? "System" : "Workspace 1",
    time: "24/10 12:00 PM",
    previewTitle: "You have meeting at ...",
    previewText: "my wind by my side ...",
  });
}

export default function Notifications({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tempData}
        renderItem={({ item }) => (
          <Item
            navigation={navigation}
            icon={item.icon}
            type={item.type}
            time={item.time}
            previewText={item.previewText}
            previewTitle={item.previewTitle}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
