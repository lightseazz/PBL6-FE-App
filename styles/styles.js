import { StyleSheet, StatusBar } from "react-native";
export const general = StyleSheet.create({
  centerView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginBottom: 30,
    width: "80%",
  },
  containerWithOutStatusBar: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    padding: "5%",
    backgroundColor: "white",
  },

  button: {
    width: "30%",
  },
  text: {
    margin: 20,
  },
});
