import { createDrawerNavigator } from "@react-navigation/drawer";
import LeftDrawerContent from "./LeftDrawerContent";
import RightDrawerScreen from "./RighDrawerScreen";
import { WorkspaceIdContext } from "../../hook/WorkspaceContext";
import { currentChannelIdContext } from "../../hook/ChannelContext";
import { useState } from "react";

const LeftDrawer = createDrawerNavigator();

export default function LeftDrawerScreen({ route }) {
  const { workspaceId } = route.params;
  let [currentChannelId, setCurrentChannelId] = useState("");

  return (
    <WorkspaceIdContext.Provider value={workspaceId}>
      <currentChannelIdContext.Provider
        value={{ currentChannelId, setCurrentChannelId }}
      >
        <LeftDrawer.Navigator
          id="LeftDrawer"
          initialRouteName="CurrentChannel"
          screenOptions={{ drawerPosition: "left", headerShown: false }}
          drawerContent={(props) => <LeftDrawerContent {...props} />}
        >
          <LeftDrawer.Screen name="RightDrawer" component={RightDrawerScreen} />
        </LeftDrawer.Navigator>
      </currentChannelIdContext.Provider>
    </WorkspaceIdContext.Provider>
  );
}
