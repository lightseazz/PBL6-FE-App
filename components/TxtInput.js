import { TextInput } from "react-native-paper";
import { general } from "../styles/styles";

export default function TxtInput({ label }) {
  return <TextInput label={label} mode="outlined" style={general.textInput} />;
}
