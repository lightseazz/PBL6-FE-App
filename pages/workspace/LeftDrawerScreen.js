import ChatChannel from "../chatChannel/ChatChannel";
import { createDrawerNavigator } from "@react-navigation/drawer";
import LeftDrawerContent from "./LeftDrawerContent";

const LeftDrawer = createDrawerNavigator();

export default function LeftDrawerCcreen({ navigation }) {
  return (
    <LeftDrawer.Navigator
      id="LeftDrawer"
      initialRouteName="Channel1"
      screenOptions={{ drawerPosition: "left", headerShown: false }}
      drawerContent={(props) => (
        <LeftDrawerContent {...props} navigation={navigation} />
      )}
    >
      <LeftDrawer.Screen name="DefaultChannel" component={ChatChannel} />
    </LeftDrawer.Navigator>
  );
}
