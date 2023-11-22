import ChatChannel from "../chatChannel/ChatChannel";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LeftDrawerContent from "./LeftDrawerContent";
import { useContext } from "react";

const LeftDrawer = createDrawerNavigator();

export default function LeftDrawerScreen({ navigation }) {
  return (
    <LeftDrawer.Navigator
      id="LeftDrawer"
      initialRouteName="CurrentChannel"
      screenOptions={{ drawerPosition: "left", headerShown: false }}
      drawerContent={(props) => (
        <LeftDrawerContent {...props} navigation={navigation} />
      )}
    >
      <LeftDrawer.Screen name="CurrentChannel" component={ChatChannel} />
    </LeftDrawer.Navigator>
  );
}
