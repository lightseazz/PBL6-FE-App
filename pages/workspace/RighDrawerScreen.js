import LeftDrawerCcreen from "./LeftDrawerScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import RightDrawerContent from "./RightDrawerContent";

const RightDrawer = createDrawerNavigator();

export default function RightDrawerScreen() {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      initialRouteName="Channel1"
      screenOptions={{ drawerPosition: "right", headerShown: false }}
      drawerContent={(props) => <RightDrawerContent {...props} />}
    >
      <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerCcreen} />
    </RightDrawer.Navigator>
  );
}
