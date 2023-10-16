import { StyleSheet,StatusBar } from "react-native";

export const cssWorkspace = StyleSheet.create({
    View: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      padding: '5%',
      
    },
    createWorkspaceView : {
      marginTop: '10%',
      flexDirection: 'row-reverse',
    },
    cardContainer: {
      paddingTop: 20,
    },
    cardView : {
      margin: 10,
      width: 150,
      height: 150,
      backgroundColor: 'green',
    }
})
