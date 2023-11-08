import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ColleagueChat from "../colleagueChat/ColleagueChat";
import WorkspaceList from "../workspaceManager/WorkspaceList";
import Notifacations from "../notifications/Notifacations";
import UserSetting from "../userSetting/UserSetting";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name="WorkspaceList"
        component={WorkspaceList}
        options={{
          headerTitle: "Workspace List",
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
        component={ColleagueChat}
        options={{
          headerTitle: "Colleague Chat",
          tabBarLabel: "Colleague Chat",
          tabBarIcon: () => (
            <Ionicons name="people-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifacations}
        options={{
          tabBarLabel: "Notifications",
          tabBarIcon: () => (
            <Ionicons name="notifications-outline" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="UserSetting"
        component={UserSetting}
        options={{
          headerTitle: "User Setting",
          tabBarLabel: "User Setting",
          tabBarIcon: () => (
            <Ionicons name="md-settings-outline" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
