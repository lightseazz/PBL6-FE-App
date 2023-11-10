import { TextInput } from "react-native-paper";
import { general } from "../styles/styles";

export default function SecureInput({ label, onChangeText }) {
  return (
    <TextInput
      secureTextEntry
      label={label}
      mode="outlined"
      style={general.textInput}
      onChangeText={onChangeText}
    />
  );
}
