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
  },

  button: {
    width: "30%",
  },
  text: {
    margin: 20,
  },
});

// export const css_TouchOpacity = {
//   activeOpacity: 0.6,
//   underlayColor: "#c0c4c4",
//   style: {
//     borderRadius: 10,
//   },
// };
