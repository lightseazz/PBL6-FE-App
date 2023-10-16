import { StyleSheet } from "react-native";
export const cssLogin = StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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