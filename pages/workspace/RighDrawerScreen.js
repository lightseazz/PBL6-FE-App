import LeftDrawerScreen from "./LeftDrawerScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RightDrawerContent from "./RightDrawerContent";

const RightDrawer = createDrawerNavigator();

export default function RightDrawerScreen() {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      screenOptions={{ drawerPosition: "right", headerShown: false }}
      drawerContent={(props) => <RightDrawerContent {...props} />}
    >
      <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
}
