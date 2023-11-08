import { View, FlatList } from "react-native";
import { Button, Card, FAB, Avatar, Text } from "react-native-paper";
import { layout } from "../../styles/styles";

export default function WorkspaceList({ navigation }) {
  const DATA = [
    { id: "1", title: "Workspace 1", member: 3 },
    { id: "2", title: "Workspace 2", member: 4 },
    { id: "3", title: "Workspace 3", member: 1 },
    { id: "4", title: "Workspace 4", member: 7 },
  ];
  return (
    <View style={layout.containerWithOutStatusBar}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <WorkspaceCard
            title={item.title}
            member={item.member}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <FAB
        label="create Workspace"
        icon="plus"
        style={{
          position: "absolute",
          margin: 16,
          left: 0,
          bottom: 0,
        }}
        onPress={() => navigation.navigate("WorkspaceCreate")}
      />
    </View>
  );
}

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

function WorkspaceCard({ title, navigation, member }) {
  return (
    <View
      style={{
        marginBottom: 30,
      }}
    >
      <Card>
        <Card.Title title={title} left={LeftContent} />
        <Card.Content>
          <Text variant="bodyMedium">{member} members</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={() => navigation.navigate("Chat")}>Open</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
