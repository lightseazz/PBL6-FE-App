import WorkspaceList from "./WorkspaceList";
import WorkspaceCreate from "./WorkspaceCreate";
import { header } from "../../utils/common";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatChannel from "../chatChannel/ChatChannel";

const Stack = createNativeStackNavigator();

export default function WorkspaceManager({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="WorkspaceList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WorkspaceList" component={WorkspaceList} />
      <Stack.Screen
        name="WorkspaceCreate"
        component={WorkspaceCreate}
        options={header({ title: "Create Workspace", navigation })}
      />
      <Stack.Screen name="WorkspaceChat" component={ChatChannel} />
    </Stack.Navigator>
  );
}
