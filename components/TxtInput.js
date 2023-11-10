import { TextInput } from "react-native-paper";
import { general } from "../styles/styles";

export default function TxtInput({ label, onChangeText }) {
  return (
    <TextInput
      label={label}
      mode="outlined"
      style={general.textInput}
      onChangeText={onChangeText}
    />
  );
}
