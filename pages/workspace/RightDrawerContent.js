import { View } from "react-native";
import { Button } from "react-native-paper";
import { useContext } from "react";
import { currentChannelIdContext } from "../../hook/ChannelContext";
import { buttonColor } from "../../styles/colorScheme";
import { WorkspaceIdContext } from "../../hook/WorkspaceContext";

export default function RightDrawerContent({ navigation }) {
  const {
    setCurrentChannelId,
    currentChannelId,
    setChannels,
  } = useContext(currentChannelIdContext);
  const workspaceId = useContext(WorkspaceIdContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={{ flex: 7, marginTop: 50, width: "80%" }}>
        <Button
          mode="contained"
          icon="pin"
          style={{ marginBottom: 20 }}
          {...buttonColor}
        >
          Pin Message
        </Button>
        <Button
          mode="contained"
          icon="file"
          style={{ marginBottom: 20 }}
          {...buttonColor}
        >
          media
        </Button>
      </View>
      <View
        style={{
          flex: 1,
          marginBottom: 40,
          flexDirection: "column-reverse",
          width: "80%",
        }}
      >
        <Button
          {...buttonColor}
          mode="contained"
          icon="cog-outline"
          style={{ marginBottom: 20 }}
          onPress={() =>
            navigation.navigate("ChannelSetting", {
              channelId: currentChannelId,
              workspaceId: workspaceId,
              setChannels: setChannels,
              setCurrentChannelId: setCurrentChannelId,
            })
          }
        >
          Channel Setting
        </Button>
        <Button
          {...buttonColor}
          mode="contained"
          icon="cog-outline"
          style={{ marginBottom: 20 }}
          onPress={() =>
            navigation.navigate("ChannelInvite", {
              channelId: currentChannelId,
              workspaceId: workspaceId,
            })
          }
        >
          invite to channel
        </Button>
      </View>
    </View>
  );
}
