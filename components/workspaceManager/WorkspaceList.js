import { View, FlatList } from "react-native";
import { Button, Card, FAB, Avatar, Text } from "react-native-paper";
import { layout } from "../../css/general/layout";

export default function WorkspaceList({ navigation }) {
  const DATA = [
    { id: "1", title: "Workspace 1" },
    { id: "2", title: "Workspace 2" },
    { id: "3", title: "Workspace 3" },
    { id: "4", title: "Workspace 4" },
  ];
  return (
    <View style={layout.containerWithOutStatusBar}>
      <Text variant="titleLarge" style={{ alignSelf: "center", margin: 20 }}>
        Workspace List
      </Text>

      <FlatList
        data={DATA}
        renderItem={({ item }) => <WorkspaceCard title={item.title} />}
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

function WorkspaceCard({ title }) {
  return (
    <View
      style={{
        marginBottom: 30,
      }}
    >
      <Card>
        <Card.Title title={title} left={LeftContent} />
        <Card.Actions>
          <Button>Open</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}
