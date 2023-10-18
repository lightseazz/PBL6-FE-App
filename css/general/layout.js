import { StyleSheet,StatusBar } from "react-native";
export const layout = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerWithOutStatusBar: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      padding: '5%',
    },
    textInput: {
      borderWidth: 1,
      height: 40,
      margin: 12,
      padding: 10,
      width: '80%',
    },
    button: {
      width: '30%'
    },
    text: {
      margin: 20,
    }
  });

export const css_TouchOpacity = {
  activeOpacity: 0.6,
  underlayColor: '#c0c4c4',           
  style: {
    borderRadius: 10,
  }

}