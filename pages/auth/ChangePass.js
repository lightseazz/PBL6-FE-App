import { View } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import SecureInput from "../../components/SecureInput";

export default function ChangePass({ navigation }) {
  return (
    <View style={general.centerView}>
      <SecureInput label="Enter New Password" />
      <SecureInput label="Enter new Password Again" />
      <Button mode="elevated">Change Password</Button>
    </View>
  );
}
