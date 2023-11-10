import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { general } from "../../styles/styles";
import TxtInput from "../../components/TxtInput";
import { SignUpContext } from "../../hook/AuthContext";

export default function Verify({ navigation, route }) {
  const { Token } = route.params;
  console.log(Token.substring(Token.length - 6, Token.length - 1));
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
