import RighDrawerScreen from "./RighDrawerScreen";
import { WorkspaceIdContext } from "../../hook/WorkspaceContext";

export default function Drawer({ route }) {
  const { workspaceId } = route.params;

  return (
    <WorkspaceIdContext.Provider value={workspaceId}>
      <RighDrawerScreen />
    </WorkspaceIdContext.Provider>
  );
}
