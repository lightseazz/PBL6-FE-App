import { TextInput } from "react-native-paper";
import { general } from "../styles/styles";

export default function SecureInput({ label }) {
  return (
    <TextInput
      secureTextEntry
      label={label}
      mode="outlined"
      style={general.textInput}
    />
  );
}
