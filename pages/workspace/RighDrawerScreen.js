import { createDrawerNavigator } from "@react-navigation/drawer";
import RightDrawerContent from "./RightDrawerContent";
import ChatChannel from "../chatChannel/ChatChannel";

const RightDrawer = createDrawerNavigator();

export default function RightDrawerScreen() {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      screenOptions={{ drawerPosition: "right", headerShown: false }}
      drawerContent={(props) => <RightDrawerContent {...props} />}
    >
      <RightDrawer.Screen name="Channel" component={ChatChannel} />
    </RightDrawer.Navigator>
  );
}
