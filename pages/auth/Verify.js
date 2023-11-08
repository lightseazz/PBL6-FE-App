import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import TxtInput from "../../components/TxtInput";

export default function Verify({ navigation }) {
  return (
    <View style={general.centerView}>
      <Text style={{ marginBottom: 30 }}>
        We have sent OTP to gmail: sdf@gmail.com
      </Text>
      <TxtInput label="OTP input" />
      <Button mode="elevated">Verify</Button>
    </View>
  );
}
