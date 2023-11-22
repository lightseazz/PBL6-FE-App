import RighDrawerScreen from "./RighDrawerScreen";
import { WorkspaceIdContext } from "../../hook/WorkspaceContext";
import { currentChannelIdContext } from "../../hook/ChannelContext";
import { useState } from "react";

export default function Drawer({ route }) {
  const { workspaceId } = route.params;
  let [currentChannelId, setCurrentChannelId] = useState("");

  return (
    <WorkspaceIdContext.Provider value={workspaceId}>
      <currentChannelIdContext.Provider
        value={{ currentChannelId, setCurrentChannelId }}
      >
        <RighDrawerScreen />
      </currentChannelIdContext.Provider>
    </WorkspaceIdContext.Provider>
  );
}
