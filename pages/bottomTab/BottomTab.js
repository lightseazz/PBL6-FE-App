import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ColleagueChat from "../colleagueChat/ColleagueChat";
import WorkspaceList from "../workspaceManager/WorkspaceList";
import Notifacations from "../notifications/Notifacations";
import UserSetting from "../userSetting/UserSetting";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="WorkspaceList"
        component={WorkspaceList}
        options={{
          headerTitle: "Workspace List",
          tabBarLabel: "Workspace",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="file-tray-stacked-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ColleagueChat"
        component={ColleagueChat}
        options={{
          headerTitle: "Colleague Chat",
          tabBarLabel: "Colleague Chat",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifacations}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="UserSetting"
        component={UserSetting}
        options={{
          headerTitle: "User Setting",
          tabBarLabel: "User Setting",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-settings-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
