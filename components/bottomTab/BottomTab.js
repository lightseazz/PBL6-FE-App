import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WorkspaceList from "../workspaceManager/WorkspaceList";
import WorkspaceManager from "../workspaceManager/WorkspaceManager";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="WorkspaceManager"
        component={WorkspaceManager}
        options={{
          tabBarLabel: "Workspace",
          tabBarIcon: () => (
            <Ionicons
              name="file-tray-stacked-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="ColleagueChat"
        component={WorkspaceManager}
        options={{
          tabBarLabel: "Colleague Chat",
          tabBarIcon: () => (
            <Ionicons name="people-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="TabNotification"
        component={WorkspaceManager}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: () => (
            <Ionicons name="notifications-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="UserSetting"
        component={WorkspaceManager}
        options={{
          tabBarLabel: "User Setting",
          tabBarIcon: () => (
            <Ionicons name="md-settings-outline" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
