import { Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";
// type: failed, success

export default function StatusBar({ message, type }) {
  return (
    <View style={{
      position: "absolute",
      width: '90%',
      backgroundColor: "red",
			alignSelf:'center',
			padding: 10,
    }}>
			<Text>hello</Text>
			<ProgressBar animatedValue={0.2} />

    </View>
  )
}
